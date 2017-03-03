import React from 'react';
import store from '../../client/src/redux/store.js';
import { mount, shallow, render } from 'enzyme';
import { connect, mapStateToProps} from 'react-redux';
import InviteFriends from '../../client/src/components/InitConfig/InviteFriends.jsx';

describe('CheckForInvites', () => {

  it('should render without exploding', () => {
    expect(shallow(<InviteFriends store={ store }/>).length).toBeTruthy();
  })
})
