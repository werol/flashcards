import { combineReducers } from 'redux';
import fleshcards from './fleshcards';
import authentication from './authentication';
import register from './register';
import { routerReducer as routing } from 'react-router-redux';

export default combineReducers({
  fleshcards,
  authentication,
  register,
  routing
});
