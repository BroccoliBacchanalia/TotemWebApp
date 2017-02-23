import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
// import { Route, hashHistory, Router } from 'react-router';
import store from './redux/store';
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
		console.log(this.props)
		return (
			<Provider store={store}>
				<App/>
			</Provider>
		);
	}
}

ReactDOM.render(<Totem />, document.getElementById('app'));
