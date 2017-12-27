import React, {Component} from "react";
import {Link} from "react-router";
import {addColor} from "../constants/constants";
import {browserHistory} from "react-router";

export default class FlashcardSets extends Component {

  constructor(props) {
    super(props);
    this.props.fetchFlashcards();
  }

  handleFetchingCurrentFlashcards(setId) {
    this.props.fetchCurrentFlashcards(setId);
  }

  render() {
    const items = this.props.items;
    return (
      <div className="flashcard-sets-grid">
        <h1>Flashcards</h1>
        <div>
          {
            items.length ?
              <div>
                {
                  this.props.items.map(addColor).map(item => (
                  <Link to={`/show-set/${item.setId}`}>
                    <div className="tile" style={{ height: `200px`, background: item.color }}>
                      <Link to={'/flashcards-form'} onClick={this.handleFetchingCurrentFlashcards.bind(this, item.setId)}>
                        <p><span className="glyphicon glyphicon-pencil"/></p>
                      </Link>
                      <p>
                        {item.name}
                      </p>
                    </div>
                  </Link>
                    ))
                }
                  <Link to={'/flashcards-form'}>
                    <div className="tile" style={{ height: `200px`, background: '#9CCC65' }}>
                      <p>
                        <span className="glyphicon glyphicon-plus"/>
                      </p>
                    </div>
                  </Link>
                </div>
            : ""
          }
        </div>
      </div>
    );
  }
}
