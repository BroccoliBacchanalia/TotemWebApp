import React from 'react';
import store from '../../client/src/redux/store.js';
import { mount, shallow, render } from 'enzyme';
import { connect, mapStateToProps} from 'react-redux';
import InviteFriends from '../../client/src/components/InitConfig/InviteFriends.jsx';
import mockFBFriends from '../../client/src/redux/reducers/mock_fb_friend_list.js';
import * as actions from '../../client/src/redux/actions'

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

	const friends = shallow(<InviteFriends store={ store } />)

  it('should render without exploding', () => {
    expect(friends.length).toBeTruthy();
  })

  it('expects props to be initialize upon load', () => {
    expect(friends.props().store.getState().user.uid).toEqual(null);
  });

  it('expects a list of friends in friendList', () => {
  	var changeId = friends.simulate('change', {preventDefault() {}, target: { name: 'uid', value: mockFBFriends} })
    expect(actions.updateUserData(mockFBFriends.data)).toEqual({type: 'UPDATE_USER_DATA', payload: mockFBFriends});
  });

})

describe('Initial Routes', () => {

  it('should render map if the user is signed in, has a group, and a venue', () => {
    actions.updateUserGroupId('12342143cc')
    actions.updateVenueName('2341234')
    actions.signInSuccess('1243', '123444')
  })

})
