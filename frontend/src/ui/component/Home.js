import React, {Component} from "react";
import {Link} from "react-router";
import {getColor, INDEXED_DB_OBJECT_STORE_NAME, OFFLINE, ONLINE} from "../constants/constants";
import {deleteData, getAllData, getData} from "../../indexedDB/dbHandler";
import {getStrategy} from "../utils";

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.handleGettingAllFlashcards(getStrategy());
  }

  handleGettingAllFlashcards(strategy) {
    const getFlashcardsActions = {
      [OFFLINE] : () => {
        this.props.startGettingFlashcards();
        getAllData(INDEXED_DB_OBJECT_STORE_NAME)
          .then(result => this.props.setFlashcards({data: result}))
      },
      [ONLINE] : this.props.fetchFlashcards
    };
    return getFlashcardsActions[strategy]();
  }

  handleGettingCurrentFlashcards(strategy, setId) {
    const getCurrentFlashcardsActions = {
      [OFFLINE] : () => {
        this.props.startGettingCurrentFlashcards();
        getData(INDEXED_DB_OBJECT_STORE_NAME, setId)
        .then(result => {
          this.props.setCurrentFlashcards({data: result})
        })
      },
      [ONLINE] : () => this.props.fetchCurrentFlashcards(setId)
    };
    return getCurrentFlashcardsActions[strategy]();
  }

  handleDeletingFlashcardSet(strategy, setId) {
    const getCurrentFlashcardsActions = {
      [OFFLINE] : () => {
        deleteData(INDEXED_DB_OBJECT_STORE_NAME, setId);
        this.props.deleteFlashcardsFromIndexedDBSuccess();
        this.handleGettingAllFlashcards(strategy);
      },
      [ONLINE] : () => this.props.deleteFlashcards(setId)
    };
    return getCurrentFlashcardsActions[strategy]();
  }

  openConfirmation(event, flashcardSet) {
    event.preventDefault();
    if (confirm(`Do you want to delete ${flashcardSet.name}?`))
      this.handleDeletingFlashcardSet(getStrategy(), flashcardSet.setId);
  }


  render() {
    const items = this.props.items;
    return (
      <div className="flashcard-sets-grid">
        <h1>Flashcards</h1>
        <div>
          {
            items ?
              <div>
                {
                  this.props.items.map((item, index) => (
                    <div className="tile-container" key={item.setId}>
                      <div className="config">
                        <Link to={'/flashcards-form'} onClick={this.handleGettingCurrentFlashcards.bind(this, OFFLINE, item.setId)}>
                          <p><span className="glyphicon glyphicon-pencil"/></p>
                        </Link>
                        <p onClick={event => this.openConfirmation(event, item)} >
                          <span className="glyphicon glyphicon-trash"/>
                        </p>
                      </div>
                      <Link to={`/show-set/${item.setId}`}>
                        <div className="tile" style={{  background: getColor(index) }}>
                          <p>
                            {item.name}
                          </p>
                        </div>
                      </Link>
                    </div>
                    ))
                }
                <div className="tile-container">
                  <Link to={'/flashcards-form'}>
                    <div className="tile">
                      <p>
                        <span className="glyphicon glyphicon-plus"/>
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            : ""
          }
        </div>
      </div>
    );
  }
}
