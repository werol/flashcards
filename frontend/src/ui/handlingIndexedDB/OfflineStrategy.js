import {INDEXED_DB_OBJECT_STORE_NAME} from "../constants/constants";
import {INDEXED_DB_HANDLER_MODULE} from "../../indexedDB/dbHandler";
import {browserHistory} from "react-router";
import {
  setCurrentFlashcards,
  setFlashcards,
  startGettingCurrentFlashcards,
  startGettingFlashcards
} from "../../reducers/flashcards";
import {deleteFlashcardsFromIndexedDBSuccess} from "../../reducers/flashcardsDelete";
import {saveFlashcardsToIndexedDBSuccess} from "../../reducers/flashcardsSave";

export const OfflineStrategy = function () {

  this.getAllFlashcards = function(dispatch) {
    dispatch(startGettingFlashcards());
    INDEXED_DB_HANDLER_MODULE.getAllData(INDEXED_DB_OBJECT_STORE_NAME)
      .then(result => dispatch(setFlashcards({data: result})))
  };

  this.getCurrentFlashcards = function(dispatch, setId) {
    dispatch(startGettingCurrentFlashcards());
    INDEXED_DB_HANDLER_MODULE.getData(INDEXED_DB_OBJECT_STORE_NAME, setId)
      .then(result => dispatch(setCurrentFlashcards({data: result})))
  };

  this.deleteFlashcardSet = function(dispatch, setId) {
    INDEXED_DB_HANDLER_MODULE.deleteData(INDEXED_DB_OBJECT_STORE_NAME, setId);
    dispatch(deleteFlashcardsFromIndexedDBSuccess());
    this.getAllFlashcards(dispatch);
  };

  this.saveFlashcards = function(dispatch, values) {
    values.setId ?
      INDEXED_DB_HANDLER_MODULE.putData(INDEXED_DB_OBJECT_STORE_NAME, values)
        .then(browserHistory.push('/'))
      : INDEXED_DB_HANDLER_MODULE.getAllKeys(INDEXED_DB_OBJECT_STORE_NAME)
        .then(result => {
          const tempSetId = parseFloat(`${result.length ? parseInt(result[result.length - 1] + 1) : 1}.1`);
          INDEXED_DB_HANDLER_MODULE.addData(INDEXED_DB_OBJECT_STORE_NAME, {...values, setId: tempSetId})
            .then(result => {
              dispatch(saveFlashcardsToIndexedDBSuccess());
              browserHistory.push('/');
            })
          });
  }
};


