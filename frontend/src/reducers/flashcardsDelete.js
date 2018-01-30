import {fetchFlashcards} from "./flashcards";
const DELETE_FLASHCARDS = 'DELETE_FLASHCARDS';
const DELETE_FLASHCARDS_SUCCESS = 'DELETE_FLASHCARDS_SUCCESS';
const DELETE_FLASHCARDS_FAIL = 'DELETE_FLASHCARDS_FAIL';

const initialState = {
  success: false
};

// Reducer

export default function flashcardsDeleteReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_FLASHCARDS_SUCCESS:
      return {
        ...state,
        success: true
      };
    default:
      return state;
  }
}

// Actions

export function deleteFlashcards(setId) {
  return  {
    types: [DELETE_FLASHCARDS, DELETE_FLASHCARDS_SUCCESS, DELETE_FLASHCARDS_FAIL],
    promise: client => client.delete(`/api/flashcards/${setId}`),
    afterSuccess: (dispatch, getState, response) => {
      dispatch(fetchFlashcards());
    },
    afterError: (dispatch, getState, response) => {
      window.alert("Ups... The set has not been found!");
      dispatch(fetchFlashcards());
    }
  };
}

export function deleteFlashcardsFromIndexedDBSuccess() {
  return {type: DELETE_FLASHCARDS_SUCCESS};
}
