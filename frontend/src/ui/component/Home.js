import React, {Component} from "react";
import {Link} from "react-router";
import {getColor} from "../constants/constants";

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.props.fetchFlashcards();
  }

  handleFetchingCurrentFlashcards(setId) {
    this.props.fetchCurrentFlashcards(setId);
  }

  openConfirmation(event, flashcardSet) {
    event.preventDefault();
    if (confirm(`Do you want to delete ${flashcardSet.name}?`))
      this.props.deleteFlashcards(flashcardSet.setId);
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
                        <Link to={'/flashcards-form'} onClick={this.handleFetchingCurrentFlashcards.bind(this, item.setId)}>
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
