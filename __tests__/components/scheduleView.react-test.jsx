import React from 'react';
import { connect, Provider } from 'react-redux';
import { shallow, mount, render } from 'enzyme';
import VenueScheduleRow from '../../client/src/components/VenueSchedule/ScheduleRow.jsx';
import VenueSchedule from '../../client/src/components/VenueSchedule/VenueSchedule.jsx';
import store from '../../client/src/redux/store.js'
describe('Schedule View Component Tests', () => {

  describe('should render one component', () => {
    it('renders venue schedule wihtout exploding', () => {
      const wrapper = shallow(
        <Provider store={store}>
          <VenueSchedule />
        </Provider>)
      expect(wrapper.length).toEqual(1);
    })
    // it(' schedule items should have image', () => {
    //   const wrapper = shallow(
    //     <Provider store={store}>
    //       <VenueScheduleRow />
    //     </Provider>)
    //   console.log("-------------------",wrapper.find('img').props());
    //   expect(wrapper.find('img').props().src).toEqual("abc");
    // })
    // display image artist time geofence

    //add items to agenda
    //default tofirat day
    // default to all stage
    // filter by stage and day
    // if no schedule, fail gracefully
    //should render shcedule items
    //should have retrived the venue information
  })
})