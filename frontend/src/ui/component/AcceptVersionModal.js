import React, {Component} from 'react';
import { connect } from "react-redux";
import {fetchFlashcards, setCurrentFlashcards, startGettingCurrentFlashcards} from "../../reducers/flashcards";
import {INDEXED_DB_HANDLER_MODULE} from "../../indexedDB/dbHandler";
import {INDEXED_DB_OBJECT_STORE_NAME} from "../constants/constants";
import {synchronizeFlashcards} from "../../reducers/synchronize";

class AcceptVersionModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      acceptedSets: []
    };
    this.getLocalVersion(this.state.currentIndex);
  }

  getLocalVersion(setId) {
    this.props.startGettingCurrentFlashcards();
    INDEXED_DB_HANDLER_MODULE.getData(INDEXED_DB_OBJECT_STORE_NAME, this.props.setsNotSynchronized[setId].setId)
      .then(result => {
        this.props.setCurrentFlashcards({data: result})
      });
  }

  incrementIndex() {
    this.setState({currentIndex: this.state.currentIndex + 1});
  }

  addAcceptedSet(flashcardSet) {
    this.setState({acceptedSets: this.state.acceptedSets.concat([flashcardSet])});
  }

  acceptLocal() {
    const {synchronizeFlashcards, setsNotSynchronized, set, fetchFlashcards} = this.props;
    const {currentIndex, acceptedSets} = this.state;
    const version = setsNotSynchronized[currentIndex].version;
    if (setsNotSynchronized.length === currentIndex + 1) {
      synchronizeFlashcards(acceptedSets.concat([{...set, version: version}]), this.props.version);
      fetchFlashcards();
    } else {
      this.getLocalVersion(currentIndex + 1);
      this.incrementIndex();
      this.addAcceptedSet({...set, version: version});

    }
  }

  acceptRemote() {
    const {synchronizeFlashcards, setsNotSynchronized, fetchFlashcards} = this.props;
    const {currentIndex, acceptedSets} = this.state;
    if (setsNotSynchronized.length === currentIndex + 1) {
      synchronizeFlashcards(acceptedSets.concat([setsNotSynchronized[currentIndex]]), this.props.version);
      fetchFlashcards();
    } else {
      this.getLocalVersion(currentIndex + 1);
      this.incrementIndex();
      this.addAcceptedSet(setsNotSynchronized[currentIndex]);
    }
  }

  displaySet(set) {
    return (
      <div>
        <div className="flashcard-name">
          <div><strong>NAME:</strong></div>
          <div>{set.name}</div>
        </div>
        <div className="flashcard-row">
          <div className="column">
            <strong>FRONT SIDE:</strong>
          </div>
          <div className="column">
            <strong>BACK SIDE:</strong>
          </div>
        </div>
        {
          set.flashcards.map(flashcard => (
            <div className="flashcard-row">
              <div className="column">
                {flashcard.frontSide}
              </div>
              <div className="column">
                {flashcard.backSide}
              </div>
            </div>
          ))
        }
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className="modal-container">
          <div className="content">
            <div>
              <div className="column">
                <h2>Local changes</h2>
                {
                  this.props.set.name && this.displaySet(this.props.set)
                }
              </div>
              <div className="column">
                <h2>Remote changes</h2>
                {
                  this.displaySet(this.props.setsNotSynchronized[this.state.currentIndex])
                }
              </div>
            </div>
            <div className="button-group">
              <button onClick={this.acceptLocal.bind(this)}>Accept local</button>
              <button onClick={this.acceptRemote.bind(this)}>Accept remote</button>
            </div>
          </div>
        </div>
        <div id="cover"/>
      </div>
    )
  };

}

export default connect(
  state => (
    {
      set: state.flashcards.currentItems,
    }),
  {
    startGettingCurrentFlashcards,
    setCurrentFlashcards,
    synchronizeFlashcards,
    fetchFlashcards
  }
)
(AcceptVersionModal);
