import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../redux/store.js';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

/*  Components  */
import HomeView from './HomeView.jsx'
import MapViewer from './MapViewer/MapViewer.jsx';
import Group from './Group/Group.jsx';
import VenueSchedule from './VenueSchedule/VenueSchedule.jsx';
import PersonalAgenda from './VenueSchedule/PersonalAgenda.jsx';
import ChooseVenue from './InitConfig/ChooseVenue.jsx';
import CreateGroup from './InitConfig/CreateGroup.jsx';
import InviteFriends from './InitConfig/InviteFriends.jsx';
import HeaderBlock from './Nav/Nav.jsx'

class App extends React.Component {

  render() {


    const { auth, user, nav, dispatch } = this.props;
    const hasGroup = user.groupId !== null;
      //{auth.isUserSignedIn && hasGroup ? <NavigationBar venueId={user.venueId} /> : ''}
    
    return (
    <Router>
      <div style={{ height: '100%' }}>
      <HeaderBlock />
        <Sidebar.Pushable as={Segment} className='main-view'>
          <Sidebar
            as={Menu}
            animation='overlay'
            width='thin'
            direction='right'
            visible={nav.visible}
            icon='labeled'
            vertical
            inverted
          >
            <Menu.Item as={Link} to='/map' onClick={() => dispatch({type: 'toggle_menu'})}>
              <Icon name='map' />
              Map
            </Menu.Item>
            <Menu.Item as={Link} to='/group' onClick={() => dispatch({type: 'toggle_menu'})}>
              <Icon name='users' />
              Group
            </Menu.Item>
            <Menu.Item as={Link} to='/agenda' onClick={() => dispatch({type: 'toggle_menu'})}>
              <Icon name='signup' />
              Agenda
            </Menu.Item>
            <Menu.Item as={Link} to='/schedule' onClick={() => dispatch({type: 'toggle_menu'})}>
              <Icon name='clock' />
              Schedule
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic className='remove-borders'>
              <div>
                <Route exact path="/" component={HomeView}/>
                <Route path="/group" component={Group}/>
                <Route path="/map" component={MapViewer}/>
                <Route path="/agenda" component={PersonalAgenda}/>
                <Route path="/schedule" component={VenueSchedule}/>
                <Route path="/choosevenue" component={ChooseVenue}/>
                <Route path="/creategroup" component={CreateGroup}/>
                <Route path="/invite" component={InviteFriends}/>
              </div>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
     </Router>
    );
  }
}

export default connect((store) => {
  return {
    user: store.user,
    auth: store.auth,
    nav: store.nav
  };
})(App);

