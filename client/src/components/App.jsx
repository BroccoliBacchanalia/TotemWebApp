import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../redux/store';

/*  Components  */
import NavigationBar from './Nav/Nav.jsx';
// import NavMenu from './Nav/NavMenu.jsx';
import MapViewer from './MapViewer/MapViewer.jsx';
import Group from './Group/Group.jsx';
// import VenueSchedule from './VenueSchedule/VenueSchedule.jsx';
// import ChooseVenue from './InitConfig/ChooseVenue.jsx';
// import InviteFriends from './InitConfig/InviteFriends.jsx';
// import CreateGroup from './InitConfig/CreateGroup.jsx';

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
            <Route path="/map" component={MapViewer}/>
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
