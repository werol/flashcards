import {browserHistory} from "react-router";
import {
  FORM_MODE_CREATE, FORM_MODE_UPDATE, INDEXED_DB_OBJECT_STORE_KEY_PATH,
  INDEXED_DB_OBJECT_STORE_NAME
} from "../ui/constants/constants";
import {INDEXED_DB_HANDLER_MODULE} from "../indexedDB/dbHandler";

const FETCH_FLASHCARDS = 'flashcards/FETCH_FLASHCARDS';
const FETCH_FLASHCARDS_SUCCESS = 'flashcards/FETCH_FLASHCARDS_SUCCESS';
const SET_FLASHCARDS = 'flashcards/SET_FLASHCARDS';
const FETCH_FLASHCARDS_FAIL = 'flashcards/FETCH_FLASHCARDS_FAIL';

const FETCH_CURRENT_FLASHCARDS = 'flashcards/FETCH_CURRENT_FLASHCARDS';
const FETCH_CURRENT_FLASHCARDS_SUCCESS = 'flashcards/FETCH_CURRENT_FLASHCARDS_SUCCESS';
const FETCH_CURRENT_FLASHCARDS_FAIL = 'flashcards/FETCH_CURRENT_FLASHCARDS_FAIL';


const initialState = {
  items: null,
  currentItems: null,
  mode: FORM_MODE_CREATE,
  version: null
};

// Reducer

export default function flashcardsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FLASHCARDS:
      return {
        ...state,
        loading: true
      };
    case FETCH_FLASHCARDS_SUCCESS:
      return {
        ...state,
        items: action.result.data.flashcardSets,
        version: action.result.data.version,
        mode: FORM_MODE_CREATE,
        loading: false
      };
    case SET_FLASHCARDS:
      return {
        ...state,
        items: action.result.data,
        mode: FORM_MODE_CREATE,
        loading: false
      };
    case FETCH_CURRENT_FLASHCARDS:
      return {
        ...state,
        loading: true
      };
    case FETCH_CURRENT_FLASHCARDS_SUCCESS:
      return {
        ...state,
        currentItems: action.result.data,
        mode: FORM_MODE_UPDATE,
        loading: false
      };
    default:
      return state;
  }
}

// Actions

export function fetchFlashcards() {
  return  {
    types: [FETCH_FLASHCARDS, FETCH_FLASHCARDS_SUCCESS, FETCH_FLASHCARDS_FAIL],
    promise: client => client.get('/api/flashcards'),
    afterSuccess: (dispatch, getState, response) => {
      browserHistory.push('/');
      const {initDb, clearData, addData} = INDEXED_DB_HANDLER_MODULE;
      initDb(INDEXED_DB_OBJECT_STORE_NAME, INDEXED_DB_OBJECT_STORE_KEY_PATH)
        .then(clearData(INDEXED_DB_OBJECT_STORE_NAME))
        .then(addData(INDEXED_DB_OBJECT_STORE_NAME, response.data.flashcardSets))

    }
  };
}


export function setFlashcards(result) {
  return {type: SET_FLASHCARDS, result};
}

export function setCurrentFlashcards(result) {
  return {type: FETCH_CURRENT_FLASHCARDS_SUCCESS, result};
}

export function startGettingFlashcards() {
  return {type: FETCH_FLASHCARDS};
}

export function startGettingCurrentFlashcards() {
  return {type: FETCH_CURRENT_FLASHCARDS};
}

export function fetchCurrentFlashcards(setId) {
  return  {
    types: [FETCH_CURRENT_FLASHCARDS, FETCH_CURRENT_FLASHCARDS_SUCCESS, FETCH_CURRENT_FLASHCARDS_FAIL],
    promise: client => client.get(`/api/flashcards/${setId}`)
  };
}
