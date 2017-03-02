import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../redux/store.js';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Dimmer } from 'semantic-ui-react'
import { toggleMenu, toggleDimmer } from '../redux/actions'

/*  Components  */
import HomeView from './HomeView'
import MapViewer from './MapViewer/MapViewer';
import Group from './Group/Group';
import VenueSchedule from './VenueSchedule/VenueSchedule';
import PersonalAgenda from './VenueSchedule/PersonalAgenda';
import ChooseVenue from './InitConfig/ChooseVenue';
import CreateGroup from './InitConfig/CreateGroup';
import InviteFriends from './InitConfig/InviteFriends';
import HeaderBlock from './Nav/Nav'
import SpeedDialButton from './Nav/SpeedDial'
import ContactFriends from './Nav/ContactFriends'
import ContactEmergencyServices from './Nav/ContactEmergencyServices'
import Chat from './Chat/Chat'

class App extends React.Component {

  render() {
    const navList = {
      items: [
      { displayName: 'Map', endPoint: '/map', iconName: 'map' },
      { displayName: 'Group', endPoint: '/group', iconName: 'users' },
      { displayName: 'Agenda', endPoint: '/agenda', iconName: 'signup' },
      { displayName: 'Schedule', endPoint: '/schedule', iconName: 'clock' },
       { displayName: 'Chat', endPoint: '/chat', iconName: 'chat' },
    ]}

    const { auth, user, app, dispatch } = this.props;
    const hasGroup = user.groupId !== null;
      //{auth.isUserSignedIn && hasGroup ? <NavigationBar venueId={user.venueId} /> : ''}
    
    return (

    <Router>
      <div style={{ height: '100%' }}>
 {/*       <Dimmer.Dimmable dimmed={app.activeDimmer}>
          <Dimmer active={app.activeDimmer} onClickOutside={ () => toggleDimmer() }/>*/}
          <HeaderBlock />
          <Sidebar.Pushable className='main-view'>
            <Sidebar
              as={Menu}
              animation='overlay'
              width='thin'
              direction='right'
              visible={app.visible}
              icon='labeled'
              vertical
              inverted
            >
            {navList.items.map((item, index) => {
              return (
                <Menu.Item 
                  key={ index } 
                  as={ Link } 
                  to={ item.endPoint } 
                  onClick={ () => toggleMenu() }>
                  <Icon name={ item.iconName } /> { item.displayName }
                </Menu.Item>
                )
            })}
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
                   <Route path="/chat" component={Chat}/>

                </div>
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
          <SpeedDialButton />
          <ContactFriends />
          <ContactEmergencyServices />
  {/*      </Dimmer.Dimmable>*/}
      </div>
     </Router>
    );
  }
}

export default connect((store) => {
  return {
    user: store.user,
    auth: store.auth,
    app: store.app
  };
})(App);

