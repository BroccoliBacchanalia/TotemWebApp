import { combineReducers } from 'redux';
import user from './userReducer';
import group from './groupReducer';
import app from './appReducer';
import auth from './authenticationReducer';
import venues from './venueReducer';
import venueSchedule from './venueScheduleReducer';
import chat from './chatReducer'

export default combineReducers({
  user,
  group,
  app,
  auth,
  venues,
  venueSchedule, 
  chat
});
