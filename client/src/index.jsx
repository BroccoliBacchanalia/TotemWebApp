import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Route, hashHistory, Router } from 'react-router';
//import store from './store.js';
//import styles from './styles';
//import { Provider } from 'react-redux';
import App from './components/App.jsx';

/*  Components  */
// import NavMenu from './components/Nav/NavMenu.jsx';
// import MapViewer from './components/MapView/MapView.jsx';
import Group from './components/Group/Group.jsx';
// import VenueSchedule from './components/VenueSchedule/VenueSchedule.jsx';
// import ChooseVenue from './components/InitConfig/ChooseVenue.jsx';
// import InviteFriends from './components/InitConfig/InviteFriends.jsx';
// import CreateGroup from './components/InitConfig/CreateGroup.jsx';

class Totem extends React.Component {
	render () {
		return (
			<Router history={ hashHistory } >
				<Route path="/" component={App}>
					<Route path="/group" component={() => (
						<Group
							dispatch={this.props.dispatch}
							users={this.props.location.users}
							userID={this.props.app.}
						/>
					)}/>
					<Route path="/agenda" component={() => <div>Agenda Holder</div>}/>
					<Route path="/schedule" component={() => <div>Schedule Holder</div>}/>
					<Route path="/emergency" component={() => <div>Emergency Emergency Info Holder</div>}/>
					<Route path="/choosevenue" component={() => <div>Venue Holder</div>}/>
					<Route path="/create" component={() => <div>Create Holder</div>}/>
					<Route path="/invite" component={() => <div>Invite Holder</div>}/>
				</Route>
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
})(Totem);

ReactDOM.render(<Totem />, document.getElementById('app'));
