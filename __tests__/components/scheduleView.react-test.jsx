import React from 'react';
import { connect, Provider } from 'react-redux';
import { shallow, mount, render } from 'enzyme';
import VenueScheduleRow from '../../client/src/components/VenueSchedule/ScheduleRow.jsx';
import VenueSchedule from '../../client/src/components/VenueSchedule/VenueSchedule.jsx';
import store from '../../client/src/redux/store.js'

const mockData = [
   {
    "day" : "2017-04-14T07:00:00.000Z",
    "endtime" : "5:00:00 PM",
    "geofence" : "Outdoor Theatre",
    "imgurl" : "https://s3.amazonaws.com/gv-account-assets/artist-images/20172/586ad6d8be0bf/586ad6d8be14a.jpg",
    "name" : "KING GIZZARD AND THE LIZARD WIZARD",
    "starttime" : "4:00:00 PM"
  },
   {
    "day" : "2017-04-14T07:00:00.000Z",
    "endtime" : "5:00:00 PM",
    "geofence" : "Gobi",
    "imgurl" : "https://s3.amazonaws.com/gv-account-assets/artist-images/20172/586ad6d8c3d53/586ad6d8c3e5c.jpg",
    "name" : "LITTLE DRAGON",
    "starttime" : "4:00:00 PM"
  }, 
]
const venueDefaults = {
  selectedDay: null,
  selectedStage: 'All Stages',
 isToggle: false
};

const venueScheduledefaults = {
  venues: {},
  venue: {
    address: {},
    dates: {},
    emergency: {
      operator: 911
    },
    geofences: {},
    map: {},
    name: {},
    scheduleitems: mockData
  },  
};

const item = {
  "day" : "2017-04-15T07:00:00.000Z",
  "endtime" : "11:00:00 PM",
  "geofence" : "Gobi",
  "imgurl" : "https://s3.amazonaws.com/gv-account-assets/artist-images/20172/586ad6d8e9d75/586ad6d8e9e1f.jpg",
  "name" : "SCHOOLBOY Q",
  "starttime" : "10:00:00 PM"
};


describe('Schedule View Component Tests', () => {

  
    it('Schedule view should not explode', () => {
      const wrapper = shallow(
        <Provider store={store}>
          <VenueSchedule />
        </Provider>
      );
      expect(wrapper.length).toEqual(1);
    });
    
    it('ScheduleRow should not explode', () => {
      const wrapper = shallow(
        <Provider store={store}>
          <VenueScheduleRow />
        </Provider>
      );
      expect(wrapper.length).toEqual(1);
    });

    it('each schedule item should have a name, geofence, img, start time and end time', () => {
      const wrapper = mount(
        <Provider store={store}>
         <VenueScheduleRow
            itemKey={1}
            name={item.name}
            startTime = {item.starttime}
            endTime = {item.endtime}
            geofence={item.geofence}
            day={item.day}
            imgurl={item.imgurl}>
        </VenueScheduleRow>
        </Provider>
      );
      expect(wrapper.find('.h4')).toBeTruthy();
      expect(wrapper.find('.h5')).toBeTruthy();
      expect(wrapper.find('.img')).toBeTruthy();
      expect(wrapper.find('.time')).toBeTruthy();
    });
});




