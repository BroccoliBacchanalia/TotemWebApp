import React from 'react';
import { connect } from 'react-redux';
// import { Route, hashHistory, Router } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import store from '../store.js';
//import Map from './Map.jsx';
import NavigationBar from './Nav/Nav.jsx';
//import { createUser, deleteUser } from '../actions/userActions.jsx';

import Group from './Group/Group.jsx';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavigationBar />
  				<Route exact path="/" component={() => <div>Map Holder</div>}/>
  					<Route path="/group" component={() => (
  						<Group
  							dispatch={this.props.dispatch}
  							users={this.props.location.users}
  							userID={this.props.app.userFbId}
  						/>
  					)}/>
  					<Route path="/agenda" component={() => <div>Agenda Holder</div>}/>
  					<Route path="/schedule" component={() => <div>Schedule Holder</div>}/>
  					<Route path="/emergency" component={() => <div>Emergency Emergency Info Holder</div>}/>
  					<Route path="/choosevenue" component={() => <div>Venue Holder</div>}/>
  					<Route path="/create" component={() => <div>Create Holder</div>}/>
  					<Route path="/invite" component={() => <div>Invite Holder</div>}/>
        </div>
			</Router>
    );
  }
}

export default connect((store) => {
  return {
    app: store.app,
    nav: store.nav,
    location: store.location
  };
})(App);
