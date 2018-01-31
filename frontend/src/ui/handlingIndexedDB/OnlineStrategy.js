import {fetchCurrentFlashcards, fetchFlashcards} from "../../reducers/flashcards";
import {deleteFlashcards} from "../../reducers/flashcardsDelete";
import {saveFlashcards} from "../../reducers/flashcardsSave";
import {updateFlashcards} from "../../reducers/flashcardsUpdate";

export const OnlineStrategy = function () {

  this.getAllFlashcards = function(dispatch) {
    dispatch(fetchFlashcards());
  };

  this.getCurrentFlashcards = function(dispatch, setId) {
    dispatch(fetchCurrentFlashcards(setId));
  };

  this.deleteFlashcardSet = function(dispatch, setId) {
    dispatch(deleteFlashcards(setId));
  };

  this.saveFlashcards = function(dispatch, values) {
    values.setId ?
      dispatch(updateFlashcards(values)) :
      dispatch(saveFlashcards(values));
  }
};
