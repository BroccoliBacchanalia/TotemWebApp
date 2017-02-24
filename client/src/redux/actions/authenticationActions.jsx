import firebase from 'firebase';
import { geolocate, getGroupLoc, updatedUsers } from '../actions/index.jsx';
import store from '../store.js';
export const emailChanged = (text) => {
  return {
    type: 'email_changed',
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: 'password_changed',
    payload: text
  };
};

const loginUserFail = (dispatch) => {
  store.dispatch({ type: 'login_user_fail', payload: {item} });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: 'login_user_success',
    payload: user
  });

};