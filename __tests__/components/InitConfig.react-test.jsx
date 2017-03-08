import React from 'react';
import store from '../../client/src/redux/store.js';
import { mount, shallow, render } from 'enzyme';
import { connect, mapStateToProps} from 'react-redux';
import { InviteFriends } from '../../client/src/components/InitConfig/InviteFriends.jsx';
import { ChooseGroup } from '../../client/src/components/InitConfig/ChooseGroup.jsx';
import { ChooseVenue } from '../../client/src/components/InitConfig/ChooseVenue.jsx'
import mockFBFriends from '../../client/src/redux/reducers/mock_fb_friend_list.js';
import * as actions from '../../client/src/redux/actions';
import * as firebase from 'firebase';

describe('InviteFriends', () => {

  const dummyData = {
    uid: null,
    name: null,
    groupId: null,
    groupName: '',
    pendingInvites: {},
    friendList: mockFBFriends,
    dataRetrieved: false
  }

  const friends = shallow(<InviteFriends store={ store } props={ dummyData } friendList={ dummyData.friendList.data }/>)

  it('should render without exploding', () => {
    expect(friends.length).toBeTruthy();
  })

  it('expects props to be initialize upon load', () => {
    expect(store.getState().user.uid).toEqual(null);
  });

  it('expects a list of friends in friendList', () => {
    let changeId = friends.simulate('change', {preventDefault() {}, target: { name: 'uid', value: mockFBFriends} })
    expect(actions.updateUserData(mockFBFriends.data)).toEqual({type: 'UPDATE_USER_DATA', payload: mockFBFriends});
  });

})

describe('Choose Group', () => {

ChooseGroup.prototype.removeGroupFromPendingInvites = function(id) {
  store.dispatch({
    type: 'UPDATE_USER_GROUP_ID',
    payload: { id }
  });
};

const props = {
  groupList: {
    '23234342423': 'testGroup',
    '23412344332': 'testGroup2'
  }
}

  const chooseGroup = shallow(<ChooseGroup groupList={ props.groupList } pendingInvites={ function(){} }/>)

  it('should display list of invites to user', () => {
    let listOfGroups = chooseGroup.find('.link');
    expect(listOfGroups.length).toEqual(2);
  })

  it('when clicked adds a groupid to user', () => {
    let oneGroup = chooseGroup.find('#select').first();
    oneGroup.simulate('click')
    expect(store.getState().user.groupId.length).toBeGreaterThan(1)
  })

})

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
