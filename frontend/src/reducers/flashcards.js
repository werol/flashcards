const FETCH_FLASHCARDS = 'flashcards/FETCH_FLASHCARDS';
const FETCH_FLASHCARDS_SUCCESS = 'flashcards/FETCH_FLASHCARDS_SUCCESS';
const FETCH_FLASHCARDS_FAIL = 'flashcards/FETCH_FLASHCARDS_FAIL';

const initialState = {
  items: []
};

// Reducer

export default function flashcardsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FLASHCARDS_SUCCESS:
      return {
        ...state,
        items: action.result.data
      };
    default:
      return state;
  }
}

// Actions

export function fetchFlashcards() {
  return  {
    types: [FETCH_FLASHCARDS, FETCH_FLASHCARDS_SUCCESS, FETCH_FLASHCARDS_FAIL],
    promise: client => client.get('/api/flashcards')
  };
}
