import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../redux/store.js';
import { closeMenu } from '../redux/actions';

/*  Components  */
import SideNav from './Nav/SideNav';
import SpeedDialButton from './Nav/SpeedDial';
import ContactFriends from './Nav/ContactFriends';
import ContactEmergencyServices from './Nav/ContactEmergencyServices';

const App = ({ app }) => (
  <Router>
    <div style={{ height: '100%' }} onClick={app.visible ? closeMenu : ''}>
      <SideNav app={app} />
      <SpeedDialButton />
      <ContactFriends />
      <ContactEmergencyServices />
    </div>
  </Router>
);

export default connect((store) => {
  return {
    app: store.app
  };
})(App);
