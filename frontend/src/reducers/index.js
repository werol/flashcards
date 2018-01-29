import { combineReducers } from 'redux';
import flashcards from './flashcards';
import authentication from './authentication';
import register from './register';
import synchronize from './synchronize';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';

export default combineReducers({
  flashcards,
  authentication,
  register,
  synchronize,
  form: reduxFormReducer,
  routing
});
