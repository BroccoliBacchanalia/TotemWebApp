import React from 'react';
import store from '../../client/src/redux/store'
import { connect, Provider } from 'react-redux';
import { shallow, mount, render } from 'enzyme';
import { MapViewer } from '../../client/src/components/MapViewer/MapViewer';
import { Markers } from '../../client/src/components/MapViewer/Markers';
import mockVenue from '../../__testConfig__/mock_venue_data'
import mockUser from '../../__testConfig__/mock_user_data'
import * as actions from '../../client/src/redux/actions'

console.log(mockUser)

function setup(isUserSignedIn, dataRetrieved, pendingInvites = {}, groupId = '') {
  const props = {
    members: store.getState().group.members,
    map: store.getState().venue.venue.map
  }
  props.auth.isUserSignedIn = isUserSignedIn;
  props.user.dataRetrieved = dataRetrieved;
  props.user.pendingInvites = pendingInvites;
  props.user.groupId = groupId;

  HomeView.prototype.componentWillMount = function() {};
  const wrapper = shallow(<HomeView {...props} store={store} />);

  return {
    props,
    wrapper
  };
}

describe('MapViewer Component Tests', () => {
      const mapWrapper = shallow(<MapViewer store={store} props={mockUser}/>);
      const markersWrapper = shallow(<Markers store={store}/>);
      mapWrapper.props().store.getState().group.members = mockUser;

  describe('Initialize Testing Suite', () => {
    it('the map should render without exploding', () => {
      expect(mapWrapper.props().store.getState().venue.venue).toBeAnObject;
    })
    test('the markers should render without exploding', () => {
      expect(markersWrapper.length).toEqual(1);
    })
  })

  describe('Toggling Friend Info', () => {
    xtest('should show an InfoWindow module when a user is clicked', () => {
      // console.log('before click', mapWrapper.props().store.getState().group.members.GqwU5Rrp8BOh5TJmW252Thsf0VC2.showInfo)
      expect(mapWrapper.props().store.getState().group.members.GqwU5Rrp8BOh5TJmW252Thsf0VC2.showInfo).toBeFalsy()
      // console.log(mapWrapper.find('div'))
      mapWrapper.find({'z-index': 618}).simulate('click')
      // console.log('after click', mapWrapper.props().store.getState().group.members.GqwU5Rrp8BOh5TJmW252Thsf0VC2.showInfo)
      expect(mapWrapper.props().store.getState().group.members.GqwU5Rrp8BOh5TJmW252Thsf0VC2.showInfo).toBeTruthy()
    })
    xtest('should close an InfoWindow module when a user is clicked again', () => {
      const wrapper = shallow(<Markers store={store}/>);
      expect(wrapper.length).toBeTruthy()


    })
  })
})
