const FETCH_FLESHCARDS = 'fleshcards/FETCH_FLESHCARDS';
const FETCH_FLESHCARDS_SUCCESS = 'fleshcards/FETCH_FLESHCARDS_SUCCESS';
const FETCH_FLESHCARDS_FAIL = 'fleshcards/FETCH_FLESHCARDS_FAIL';

const initialState = {
  items: []
};

// Reducer

export default function fleshcardsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FLESHCARDS_SUCCESS:
      return {
        ...state,
        items: action.result.data
      };
    default:
      return state;
  }
}

// Actions

export function fetchFleshcards() {
  return  {
    types: [FETCH_FLESHCARDS, FETCH_FLESHCARDS_SUCCESS, FETCH_FLESHCARDS_FAIL],
    promise: client => client.get('/api/fleshcards')
  };
}
