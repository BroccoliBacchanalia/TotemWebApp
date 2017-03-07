import React from 'react';
import store from '../../client/src/redux/store.js';
import { mount, shallow, render } from 'enzyme';
import { connect, mapStateToProps} from 'react-redux';
import InviteFriends from '../../client/src/components/InitConfig/InviteFriends.jsx';
import { ChooseGroup } from '../../client/src/components/InitConfig/ChooseGroup.jsx'
import mockFBFriends from '../../client/src/redux/reducers/mock_fb_friend_list.js';
import * as actions from '../../client/src/redux/actions';
import * as firebase from 'firebase';

function setup() {
  ChooseGroup.prototype.removeGroupFromPendingInvites = function(id) {
    console.log('id', id)
    store.dispatch({
    type: 'UPDATE_USER_GROUP_ID',
    payload: { id }
  });
  };
}

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

describe('Choose Group', () => {
setup();
const props = {
  groupList: {
    '23234342423': 'testGroup',
    '23412344332': 'testGroup2'
  }
}

  const chooseGroup = shallow(<ChooseGroup groupList={ props.groupList } updateUserGroupID={ function(){} }/>)

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
