import { combineReducers } from "redux";
import user from './userReducer';
import nav from './navReducer';
import auth from './authenticationReducer';
import venues from './venueReducer';
import location from './locationReducer';
import venueSchedule from './venueScheduleReducer';

export default combineReducers({
  user,
  nav,
  auth,
  venues,
  venueSchedule,
  location
});
