import React, {Component} from "react";

export default class FlashcardShow extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0
    };

    const setId = this.props.params.setId;
    this.props.fetchCurrentFlashcards(setId);
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
            set.name && !loading ?
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
