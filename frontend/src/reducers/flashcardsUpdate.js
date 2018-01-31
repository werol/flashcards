import {browserHistory} from 'react-router';

const UPDATE_FLASHCARDS = 'UPDATE_FLASHCARDS';
const UPDATE_FLASHCARDS_SUCCESS = 'UPDATE_FLASHCARDS_SUCCESS';
const UPDATE_FLASHCARDS_FAIL = 'UPDATE_FLASHCARDS_FAIL';

const initialState = {
  success: false
};

// Reducer

export default function flashcardsSaveReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FLASHCARDS_SUCCESS:
      return {
        ...state,
        success: true
      };
    default:
      return state;
  }
}

// Actions

export function updateFlashcards(record) {
  return {
    types: [UPDATE_FLASHCARDS, UPDATE_FLASHCARDS_SUCCESS, UPDATE_FLASHCARDS_FAIL],
    promise: client => client.put('/api/flashcards', record),
    afterSuccess: (dispatch, getState, response) => {
      browserHistory.push('/');
    },
    afterError: (dispatch, getState, response) => {
      window.alert("Ups... Your version of this set is not up-to-date with remote database, " +
        "you will be redirect to the home page, your changes could not be saved!");
      browserHistory.push('/');
    }
  };
}
