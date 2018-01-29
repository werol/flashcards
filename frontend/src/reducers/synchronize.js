const SYNCHRONIZE_FLASHCARDS = 'SYNCHRONIZE_FLASHCARDS';
const SYNCHRONIZE_FLASHCARDS_SUCCESS = 'SYNCHRONIZE_FLASHCARDS_SUCCESS';
const SYNCHRONIZE_FLASHCARDS_FAIL = 'SYNCHRONIZE_FLASHCARDS_FAIL';

const initialState = {
  success: false,
  setsNotSynchronized: []
};

// Reducer

export default function flashcardsSynchronizeReducer(state = initialState, action) {
  switch (action.type) {
    case SYNCHRONIZE_FLASHCARDS:
      return {
        ...state,
        success: false,
        setsReturned: []
      };
    case SYNCHRONIZE_FLASHCARDS_SUCCESS:
      return {
        ...state,
        success: true,
        setsNotSynchronized: action.result.data
      };
    default:
      return state;
  }
}

// Actions

export function synchronizeFlashcards(records) {
  return  {
    types: [SYNCHRONIZE_FLASHCARDS, SYNCHRONIZE_FLASHCARDS_SUCCESS, SYNCHRONIZE_FLASHCARDS_FAIL],
    promise: client => client.post('/api/synchronize', records),
    afterSuccess: (dispatch, getState, response) => {
      console.log(response);
    }
  };
}

