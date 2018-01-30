import React, {Component} from "react";
import {INDEXED_DB_OBJECT_STORE_NAME, OFFLINE, ONLINE} from "../../constants/constants";
import {INDEXED_DB_HANDLER_MODULE} from "../../../indexedDB/dbHandler";
import {getStrategy} from "../../utils";

export default class FlashcardShow extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0
    };

    const setId = this.props.params.setId;
    this.handleGettingCurrentFlashcards(getStrategy(), parseFloat(setId));
  }

  handleGettingCurrentFlashcards(strategy, setId) {
    const getCurrentFlashcardsActions = {
      [OFFLINE] : () => {
        this.props.startGettingCurrentFlashcards();
        INDEXED_DB_HANDLER_MODULE.getData(INDEXED_DB_OBJECT_STORE_NAME, setId)
          .then(result => {
            this.props.setCurrentFlashcards({data: result})
          })
      },
      [ONLINE] : () => this.props.fetchCurrentFlashcards(setId)
    };
    return getCurrentFlashcardsActions[strategy]();
  }

  previousCard(){
    const {currentIndex} = this.state;
    if (currentIndex > 0)
      this.setState({currentIndex: currentIndex - 1})
  }

  nextCard(){
    const {currentIndex} = this.state;
    if (currentIndex < this.props.set.flashcards.length - 1)
      this.setState({currentIndex: currentIndex + 1})
  }

  render() {
    const {set, loading} = this.props;
    return (
      <div className="flashcard-show" >

        <div>
          {
            set && !loading ?
              <div>
                <h4>{this.state.currentIndex + 1} / {set.flashcards.length}</h4>
                <div className="left-arrow" onClick={this.previousCard.bind(this)}>
                  <span className="glyphicon glyphicon-chevron-left"/>
                </div>
                {
                  set.flashcards
                    .filter((item, index) => index === this.state.currentIndex)
                    .map(item => (
                      <div className="flashcard" key={item.flashcardId}>
                        <div className="front face">{item.frontSide}</div>
                        <div className="back face">{item.backSide}</div>
                      </div>
                    ))
                }
                <div className="right-arrow" onClick={this.nextCard.bind(this)}>
                  <span className="glyphicon glyphicon-chevron-right"/>
                </div>
              </div>
              : <h1>Loading...</h1>
          }
        </div>
      </div>
    );
  }
}
