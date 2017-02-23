import { combineReducers } from "redux";
import users from './userReducer.jsx';
import map from './mapReducer.jsx';

export default combineReducers({
  users,
  map
});
