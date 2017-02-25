import { combineReducers } from "redux";
import user from './userReducer';
import nav from './navReducer';
import auth from './authenticationReducer';
import config from './venueReducer';
import location from './locationReducer';
import venueSchedule from './venueScheduleReducer';

export default combineReducers({
  user,
  nav,
  auth,
  config,
  venueSchedule,
  location
});
