import { browserHistory } from 'react-router';
const CREATE_FLASHCARDS = 'CREATE_FLASHCARDS';
const CREATE_FLASHCARDS_SUCCESS = 'CREATE_FLASHCARDS_SUCCESS';
const CREATE_FLASHCARDS_FAIL = 'CREATE_FLASHCARDS_FAIL';

const initialState = {
  createFlashcardsSuccess: false
};

// Reducer

export default function flashcardsSaveReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_FLASHCARDS_SUCCESS:
      return {
        ...state,
        createFlashcardsSuccess: true
      };
    default:
      return state;
  }
}

// Actions

export function saveFlashcards(record) {
  return  {
    types: [CREATE_FLASHCARDS, CREATE_FLASHCARDS_SUCCESS, CREATE_FLASHCARDS_FAIL],
    promise: (client) => client.post('/api/flashcards', record),
    afterSuccess: () => {
      browserHistory.push('/');
    }
  };
}
