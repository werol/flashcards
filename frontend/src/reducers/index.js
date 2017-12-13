import { combineReducers } from 'redux';
import flashcards from './flashcards';
import authentication from './authentication';
import register from './register';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';

export default combineReducers({
  flashcards,
  authentication,
  register,
  form: reduxFormReducer,
  routing
});
