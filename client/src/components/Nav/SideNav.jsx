import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react';

/*  Components  */
import HeaderBlock from './Nav';
import HomeView from '../HomeView'
import Group from '../Group/Group';
import MapViewer from '../MapViewer/MapViewer';
import PersonalAgenda from '../Agenda/PersonalAgenda';
import VenueSchedule from '../VenueSchedule/VenueSchedule';
import ChooseVenue from '../InitConfig/ChooseVenue';
import CreateGroup from '../InitConfig/CreateGroup';
import InviteFriends from '../InitConfig/InviteFriends';
import Chat from '../Chat/Chat';

const SideNav = ({ app }) => {
  const navList = [
    { displayName: 'Map',      endPoint: '/map',      iconName: 'map',    className: 'mapNav'   },
    { displayName: 'Group',    endPoint: '/group',    iconName: 'users',  className: 'groupNav' },
    { displayName: 'Agenda',   endPoint: '/agenda',   iconName: 'signup', className: 'agendaNav'},
    { displayName: 'Schedule', endPoint: '/schedule', iconName: 'clock',  className: 'schedNav' },
    { displayName: 'Chat',     endPoint: '/chat',     iconName: 'chat',   className: 'chatNav'  },
  ];

  return (
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
        {navList.map((item, index) => (
          <Menu.Item
            key={ index }
            as={ Link }
            to={ item.endPoint }>
            <Icon name={ item.iconName } /> { item.displayName }
          </Menu.Item>
        ))}
      </Sidebar>
      <Sidebar.Pusher>
        <HeaderBlock />
        <Segment basic className='remove-borders' style={{ height: '100%' }}>
          <div style={{ height: '100%' }}>
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
  );
}

export default SideNav;
