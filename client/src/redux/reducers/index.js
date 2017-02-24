import { combineReducers } from "redux";
import app from './appReducer';
import nav from './navReducer';
import auth from './authenticationReducer';
import venues from './venueReducer';
import location from './locationReducer';
import venueSchedule from './venueScheduleReducer';

export default combineReducers({
  app,
  nav,
  auth,
  venues,
  venueSchedule,
  location
});
