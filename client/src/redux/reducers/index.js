import { combineReducers } from "redux";
import app from './appReducer';
import nav from './navReducer';
import auth from './authenticationReducer';
import config from './configReducer';
import location from './locationReducer';
import venueSchedule from './venueScheduleReducer';

export default combineReducers({
  app,
  nav,
  auth,
  config,
  venueSchedule,
  location
});
