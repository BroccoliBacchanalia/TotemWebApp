import React from 'react';
import ReactDOM from 'react-dom';
//import { connect } from 'react-redux';
import { Route, hashHistory, Router } from 'react-router';
//import store from './store.js';
//import styles from './styles';
//import { Provider } from 'react-redux';
import App from './components/App.jsx';

/*  Components  */
// import NavMenu from './components/Nav/NavMenu';
// import MapViewer from './components/MapView/MapView';
// import Group from './components/Group/Group';
// import VenueSchedule from './components/VenueSchedule/VenueSchedule';
// import ChooseVenue from './components/InitConfig/ChooseVenue';
// import InviteFriends from './components/InitConfig/InviteFriends';
// import CreateGroup from './components/InitConfig/CreateGroup';
ReactDOM.render(
	<Router history={ hashHistory } >
		<Route path="/" component={App}/>
		<Route path="/group" component={() => <div>Group Holder</div>}/>
		<Route path="/agenda" component={() => <div>Agenda Holder</div>}/>
		<Route path="/schedule" component={() => <div>Schedule Holder</div>}/>
		<Route path="/emergency" component={() => <div>Emergency Emergency Info Holder</div>}/>
		<Route path="/choosevenue" component={() => <div>Venue Holder</div>}/>
		<Route path="/create" component={() => <div>Create Holder</div>}/>
		<Route path="/invite" component={() => <div>Invite Holder</div>}/>
	</Router>
  , document.getElementById('app')
)

// export default connect((store) => {
//   return {
//     app: store.app,
//     nav: store.nav,
//     location: store.location
//   };
// })(App);
