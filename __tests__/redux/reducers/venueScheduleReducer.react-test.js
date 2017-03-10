import venueScheduleReducer from '../../../client/src/redux/reducers/venueScheduleReducer.js';
import React from 'react';
import store from '../../../client/src/redux/store';
import * as actions from '../../../client/src/redux/actions/venueScheduleActions';

const defaults = {
  agenda: [1,5,3,8],
  selectedDay: "Friday",
  selectedStage: 'sutro'
};


describe('Venue Schedule Reducer', () => {

  it('Should have set defaults', () => {
    expect(venueScheduleReducer(undefined, {})).toEqual({
      isToggle: false,
      selectedDay: null,
      selectedStage: 'All Stages'
    })
  })

  it('Should be able change day', () => {
    expect(
      venueScheduleReducer(undefined, {
        type: 'UPDATE_DAY',
        payload: {
          day: 'friday'
        }
      }).selectedDay
    ).toBeTruthy()
  })
  
   it('Should be able change stage', () => {
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