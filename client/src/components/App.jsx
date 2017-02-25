import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../redux/store.js';

/*  Components  */
import NavigationBar from './Nav/Nav.jsx';
// import NavMenu from './Nav/NavMenu.jsx';
import MapViewer from './MapViewer/MapViewer.jsx';
import Group from './Group/Group.jsx';
import VenueSchedule from './VenueSchedule/VenueSchedule.jsx';
// import ChooseVenue from './InitConfig/ChooseVenue.jsx';
// import InviteFriends from './InitConfig/InviteFriends.jsx';
// import CreateGroup from './InitConfig/CreateGroup.jsx';
import * as authenticationActions from '../redux/actions/authenticationActions';
import SignInButton from './Auth/SignInButton';

class App extends React.Component {
  render() {

    if (true) {
      return (
        <Router>
          <div>
            <NavigationBar />
    				<Route exact path="/" component={() => (
              <Group
                dispatch={this.props.dispatch}
                users={this.props.location.users}
                userID={this.props.app.userFbId}
              />
            )}/>
  					<Route path="/group" component={() => (
  						<Group
  							dispatch={this.props.dispatch}
  							users={this.props.location.users}
  							userID={this.props.app.userFbId}
  						/>
  					)}/>
            <Route path="/map" component={MapViewer}/>
  					<Route path="/agenda" component={() => <div>Agenda Holder</div>}/>
  					<Route path="/schedule" component={VenueSchedule}/>
  					<Route path="/choosevenue" component={() => <div>Venue Holder</div>}/>
  					<Route path="/create" component={() => <div>Create Holder</div>}/>
  					<Route path="/invite" component={() => <div>Invite Holder</div>}/>
          </div>
  			</Router>
      )
    } else {
      return (
        <SignInButton
          onSignInClick={() => this.props.dispatch(authenticationActions.signIn())}
          auth={ this.props.auth }/>
      )
    }
  }
}

export default connect((store) => {
  return {
    app: store.app,
    nav: store.nav,
    location: store.location,
    auth: store.auth
  };
})(App);
