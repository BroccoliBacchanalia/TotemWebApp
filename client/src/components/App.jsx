import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../redux/store.js';

/*  Components  */
import NavigationBar from './Nav/Nav.jsx';
import HomeView from './HomeView.jsx'
import MapViewer from './MapViewer/MapViewer.jsx';
import Group from './Group/Group.jsx';
import VenueSchedule from './VenueSchedule/VenueSchedule.jsx';
import PersonalAgenda from './VenueSchedule/PersonalAgenda.jsx';
import ChooseVenue from './InitConfig/ChooseVenue.jsx';
import CreateGroup from './InitConfig/CreateGroup.jsx';
import InviteFriends from './InitConfig/InviteFriends.jsx';

class App extends React.Component {

  render() {
    const { auth, user } = this.props;
    const hasGroup = user.groupId !== null;

    return (
      <Router>
        <div style={{ height: '100%' }}>
          {auth.isUserSignedIn && hasGroup ? <NavigationBar venueId={user.venueId} /> : ''}
          <Route exact path="/" component={HomeView}/>
          <Route path="/group" component={Group}/>
          <Route path="/map" component={MapViewer}/>
          <Route path="/agenda" component={PersonalAgenda}/>
          <Route path="/schedule" component={VenueSchedule}/>
          <Route path="/choosevenue" component={ChooseVenue}/>
          <Route path="/creategroup" component={CreateGroup}/>
          <Route path="/invite" component={InviteFriends}/>
        </div>
      </Router>
    );
  }
}

export default connect((store) => {
  return {
    user: store.user,
    auth: store.auth
  };
})(App);
