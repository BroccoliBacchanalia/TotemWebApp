import venueScheduleReducer from '../../../client/src/redux/reducers/venueScheduleReducer.js';
import React from 'react';
import renderer from 'react-test-renderer';
import * as actions from '../../../client/src/redux/actions/venueScheduleActions';
console.log("_____________________________________________________________________________");
describe('Venue Schedule Reducer', () => {

	 test('Should have set defaults', () => {
	  expect(venueScheduleReducer(undefined, {})).toEqual({
		  agenda: [],
		  selectedDay: null,
		  selectedStage: 'All Stages'
	  })
  })
  test('Should be able change day', () => {
    expect(
      venueScheduleReducer(undefined, {
        type: 'UPDATE_DAY',
        payload: {
          day: 'friday'
        }
      }).selectedDay
    ).toBeTruthy()
  })
   test('Should be able change stage', () => {
    expect(
      venueScheduleReducer(undefined, {
        type: 'UPDATE_STAGE',
        payload: {
          stage: 'sutro'
        }
      }).selectedStage
    ).toBeTruthy()
  })
  
})