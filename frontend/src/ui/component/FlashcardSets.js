import React, {Component} from "react";
import {Link} from "react-router";
import {addColor} from "../constants/constants";

export default class FlashcardSets extends Component {

  constructor(props) {
    super(props);
    this.props.fetchFlashcards();
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
                  this.props.items.map(addColor).map(item => (
                  <Link to={'/'}>
                    <div className="tile" style={{ height: `200px`, background: item.color }}>
                      <p>
                        {item.name}
                      </p>
                    </div>
                  </Link>
                    ))
                }
                  <Link to={'/add_set'}>
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
