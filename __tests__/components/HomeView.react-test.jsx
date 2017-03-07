import React from 'react';
import { shallow, mount, render } from 'enzyme';
import store from '../../client/src/redux/store';

import { HomeView } from '../../client/src/components/HomeView';
import Loading from '../../client/src/components/Auth/Loading';
import SignInButton from '../../client/src/components/Auth/SignInButton';
import ChooseGroup from '../../client/src/components/InitConfig/ChooseGroup';
import ChooseVenue from '../../client/src/components/InitConfig/ChooseVenue';
import MapViewer from '../../client/src/components/MapViewer/MapViewer';

function setup(isUserSignedIn, dataRetrieved, pendingInvites = {}, groupId = '') {
  const props = {
    user: store.getState().user,
    auth: store.getState().auth
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

describe('HomeView', () => {
  describe('HomeView Auth Routing', () => {
    it('should render SignInButton when auth.isUserSignedIn is false', () => {
      const { wrapper } = setup(false, false);

      expect(wrapper.unrendered.props.auth.isUserSignedIn).toEqual(false);
      expect(wrapper.find('#signInButton').length).toEqual(1);
    });

    it('should render Loading when auth.isUserSignedIn is true and user.dataRetrieved is false', () => {
      const { wrapper } = setup(true, false);

      expect(wrapper.unrendered.props.auth.isUserSignedIn).toEqual(true);
      expect(wrapper.unrendered.props.user.dataRetrieved).toEqual(false);
      expect(wrapper.find(Loading).length).toEqual(1);
    });

    it('should render ChooseGroup when auth.isUserSignedIn is true, user.dataRetrieved is true, groupId does not exist, and the user has pending invites', () => {
      const { wrapper } = setup(true, true, { 0: true });

      expect(wrapper.unrendered.props.auth.isUserSignedIn).toEqual(true);
      expect(wrapper.unrendered.props.user.dataRetrieved).toEqual(true);
      expect(!!wrapper.unrendered.props.user.groupId).toEqual(false);
      expect(Object.keys(wrapper.unrendered.props.user.pendingInvites).length).toBeGreaterThan(0);
      expect(wrapper.find(ChooseGroup).length).toEqual(1);
    });

    it('should render ChooseVenue when auth.isUserSignedIn is true, user.dataRetrieved is true, groupId does not exist, and the user does not have pending invites', () => {
      const { wrapper } = setup(true, true);

      expect(wrapper.unrendered.props.auth.isUserSignedIn).toEqual(true);
      expect(wrapper.unrendered.props.user.dataRetrieved).toEqual(true);
      expect(!!wrapper.unrendered.props.user.groupId).toEqual(false);
      expect(Object.keys(wrapper.unrendered.props.user.pendingInvites).length).toEqual(0);
      expect(wrapper.find(ChooseVenue).length).toEqual(1);
    });

    it('should render MapViewer when auth.isUserSignedIn is true, user.dataRetrieved is true, and a groupId exists', () => {
      const { wrapper } = setup(true, true, {}, 'abc123');

      expect(wrapper.unrendered.props.auth.isUserSignedIn).toEqual(true);
      expect(wrapper.unrendered.props.user.dataRetrieved).toEqual(true);
      expect(!!wrapper.unrendered.props.user.groupId).toEqual(true);
      expect(wrapper.find(MapViewer).length).toEqual(1);
    });
  });
});
