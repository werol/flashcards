import React, {Component} from "react";
import {Link} from "react-router";
import {getColor} from "../constants/constants";
import {getStrategy} from "../handlingIndexedDB/getStrategy";
import {HandlingIndexedDBStrategy} from "../handlingIndexedDB/HandlingIndexedDBStrategy";

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    };
    this.handlingIndexedDBStrategy = new HandlingIndexedDBStrategy(this.props.dispatch);
    this.handleGettingAllFlashcards();
  }

  handleGettingAllFlashcards() {
    this.handlingIndexedDBStrategy.setStrategy(getStrategy());
    this.handlingIndexedDBStrategy.getAllFlashcards()
  }

  handleGettingCurrentFlashcards(setId) {
    this.handlingIndexedDBStrategy.setStrategy(getStrategy());
    this.handlingIndexedDBStrategy.getCurrentFlashcards(setId)
  }

  handleDeletingFlashcardSet(setId) {
    this.handlingIndexedDBStrategy.setStrategy(getStrategy());
    this.handlingIndexedDBStrategy.deleteFlashcardSet(setId)
  }

  openConfirmation(event, flashcardSet) {
    event.preventDefault();
    if (confirm(`Do you want to delete ${flashcardSet.name}?`))
      this.handleDeletingFlashcardSet(flashcardSet.setId);
  }

  handleSearchInputChange(event) {
    const searchValue = event.target.value;
    this.setState({searchValue});
  }

  render() {
    const items = this.props.items;
    return (
      <div className="flashcard-sets-grid">
        <h1>Flashcards</h1>
        <div className="search-bar">
          <input type="text"
                 placeholder="Search for flashcard set..."
                 onChange={this.handleSearchInputChange.bind(this)}
          />
          <span className="glyphicon glyphicon-search"/>
        </div>
        <div>
          {
            items ?
              <div>
                {
                  this.props.items
                    .filter(item => item.name.toLowerCase().includes(this.state.searchValue.toLowerCase()))
                    .map((item, index) => (
                    <div className="tile-container" key={item.setId}>
                      <div className="config">
                        <Link to={'/flashcards-form'} onClick={this.handleGettingCurrentFlashcards.bind(this, item.setId)}>
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
