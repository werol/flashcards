import React, {Component} from "react";
import {connect} from "react-redux";
import FlashcardsForm from "../component/flashcards/FlashcardsForm";

class FlashcardsFormPage extends Component {

  render() {
    return (
      !this.props.loading ? <FlashcardsForm/> : <h1>Loading...</h1>
    );
  }
}

export default connect(
  state => ({loading: state.flashcards.loading}))
(FlashcardsFormPage);
