import {fetchFlashcards} from "./flashcards";

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
        setsNotSynchronized: action.result.data.flashcardSets
      };
    default:
      return state;
  }
}

// Actions

export function synchronizeFlashcards(records, version) {
  return  {
    types: [SYNCHRONIZE_FLASHCARDS, SYNCHRONIZE_FLASHCARDS_SUCCESS, SYNCHRONIZE_FLASHCARDS_FAIL],
    promise: client => client.post('/api/synchronize', {flashcardSets: records, version: version}),
    afterSuccess: (dispatch, getState, response) => {
      if (!response.data.flashcardSets.length) {
        dispatch(fetchFlashcards());
      }
    }
  };
}

