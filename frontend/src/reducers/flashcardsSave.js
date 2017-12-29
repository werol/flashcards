import { browserHistory } from 'react-router';
import {FORM_MODE_CREATE, INDEXED_DB_OBJECT_STORE_NAME} from "../ui/constants/constants";
import {addData, putData} from "../indexedDB/dbHandler";
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
      getState().flashcards.mode === FORM_MODE_CREATE
        ? addData(INDEXED_DB_OBJECT_STORE_NAME, response.data)
        : putData(INDEXED_DB_OBJECT_STORE_NAME, response.data);
    }
  };
}
