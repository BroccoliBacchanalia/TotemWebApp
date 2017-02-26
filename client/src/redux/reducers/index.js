import { combineReducers } from "redux";
import user from './userReducer';
import group from './groupReducer';
import nav from './navReducer';
import auth from './authenticationReducer';
import venues from './venueReducer';
import location from './locationReducer';
import venueSchedule from './venueScheduleReducer';

export default combineReducers({
  user,
  group,
  nav,
  auth,
  venues,
  venueSchedule,
  location
});
