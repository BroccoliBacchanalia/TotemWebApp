import venueScheduleReducer from '../../../client/src/redux/reducers/venueScheduleReducer.js';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Venue Schedule Reducer', () => {

	test('Should have set defaults', () => {
	  expect(venueScheduleReducer(undefined, {})).toEqual({
		  agenda: [],
		  selectedDay: null,
		  selectedStage: 'All Stages'
	  })
  })
})