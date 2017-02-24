import { combineReducers } from "redux";
import users from './userReducer.jsx';
import map from './mapReducer.jsx';
import venueSchedule from './venueScheduleReducer.js'

export default combineReducers({
  users,
  map,
  venueSchedule
});
