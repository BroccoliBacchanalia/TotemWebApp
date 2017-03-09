import React from 'react';
import store from '../../client/src/redux/store.js';
import { mount, shallow, render } from 'enzyme';
import { connect, mapStateToProps} from 'react-redux';
import { ChooseVenue } from '../../client/src/components/InitConfig/ChooseVenue.jsx'
import mockFBFriends from '../../__testConfig__/mock_fb_friend_list';
import * as actions from '../../client/src/redux/actions';
import * as firebase from 'firebase';

describe('Choose Venue', () => {
  const venues = {
    'qwrwewqerqwre' : 'Outside Lands',
    '241wffasddsff' : 'Coachella',
    '2342341saafaa' : 'burningman'
  }

  const chooseVenue = shallow(<ChooseVenue venues={ venues }/>)

  it('should display list of all venues', () => {
    let listOfVenues = chooseVenue.find('#venueItem');
    expect(listOfVenues.length).toEqual(3);
  })

  it('should add a venue id when venue is clicked', () =>{
    let clickVenues = chooseVenue.find('#venueItem').first();
    clickVenues.simulate('click');
    expect(store.getState().group.venueId.length).toBeGreaterThan(0);
  })
})
