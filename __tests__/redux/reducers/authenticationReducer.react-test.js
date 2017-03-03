import * as actions from '../../../client/src/redux/actions/authenticationActions';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Authentication Reducer', () => {

	test('Should have set defaults', () => {
	  expect(auth(undefined, {})).toEqual({
		  isUserSignedIn: false,
		  isInProgress: false,
		  hasError: false,
		  errorMessage: '',
	  });
  });

  test('Should be able to handle SIGN_IN_SUCCESS', () => {
  	expect(
  		auth(undefined, {
        type: 'SIGNIN_SUCCESS'
      }).isUserSignedIn
    ).toBeTruthy()
  });

  test('Should be able to handle SIGN_IN_SUCCESS', () => {
  	expect(
  		auth(undefined, {
        type: 'SIGNIN_SUCCESS'
      }).isInProgress
    ).toBeFalsy()
  });

  test('Should be able to handle SIGNIN', () => {
  	expect(
  		auth(undefined, {
        type: 'SIGNIN'
      }).isInProgress
    ).toBeTruthy()
  });

  test('Should be able to handle SIGNIN_ERROR', () => {
  	expect(
  		auth(undefined, {
        type: 'SIGNIN_ERROR'
      }).hasError
    ).toBeTruthy()
  });
});