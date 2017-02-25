import { combineReducers } from "redux";
import user from './userReducer';
import nav from './navReducer';
import auth from './authenticationReducer';
import config from './configReducer';
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
