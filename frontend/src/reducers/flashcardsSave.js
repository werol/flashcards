import { browserHistory } from 'react-router';
const CREATE_FLASHCARDS = 'CREATE_FLASHCARDS';
const CREATE_FLASHCARDS_SUCCESS = 'CREATE_FLASHCARDS_SUCCESS';
const CREATE_FLASHCARDS_FAIL = 'CREATE_FLASHCARDS_FAIL';

const initialState = {
  success: false
};

// Reducer

export default function flashcardsSaveReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_FLASHCARDS_SUCCESS:
      return {
        ...state,
        success: true
      };
    default:
      return state;
  }
}

// Actions

export function saveFlashcards(record) {
  return  {
    types: [CREATE_FLASHCARDS, CREATE_FLASHCARDS_SUCCESS, CREATE_FLASHCARDS_FAIL],
    promise: client => client.post('/api/flashcards', record),
    afterSuccess: (dispatch, getState, response) => {
      browserHistory.push('/');
    },
    afterError: (dispatch, getState, response) => {
      window.alert("Your version of this set is not up-to-date with remote database, " +
        "you will be redirect to the home page, your changes could not be saved!");
      browserHistory.push('/');
    }
  };
}

export function saveFlashcardsToIndexedDBSuccess() {
  return {type: CREATE_FLASHCARDS_SUCCESS};
}
