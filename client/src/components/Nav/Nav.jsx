import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react';
import localStyles from './UtilStyles.css';

/*  Components  */
import HeaderBlock from './HeaderBlock';
import HomeView from '../HomeView'
import Group from '../Group/Group';
import MapViewer from '../MapViewer/MapViewer';
import PersonalAgenda from '../Agenda/PersonalAgenda';
import VenueSchedule from '../VenueSchedule/VenueSchedule';
import ChooseVenue from '../InitConfig/ChooseVenue';
import CreateGroup from '../InitConfig/CreateGroup';
import InviteFriends from '../InitConfig/InviteFriends';

const Nav = ({ app, user }) => {
  const navList = [
    { displayName: 'Map',      endPoint: '/map',      iconName: 'map',    className: localStyles.mapNav    },
    { displayName: 'Group',    endPoint: '/group',    iconName: 'users',  className: localStyles.groupNav  },
    { displayName: 'Agenda',   endPoint: '/agenda',   iconName: 'signup', className: localStyles.agendaNav },
    { displayName: 'Schedule', endPoint: '/schedule', iconName: 'clock',  className: localStyles.schedNav  },
  ];
  const chat = { displayName: 'Chat', href: 'https://m.me/', iconName: 'chat', className: localStyles.chatNav  }

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
            className={ item.className }
            key={ index }
            as={ Link }
            to={ item.endPoint }>
            <Icon name={ item.iconName } /> { item.displayName }
          </Menu.Item>
        ))}

        <Menu.Item
          href={ chat.href }
          className={ chat.className }>
          <Icon name={ chat.iconName } /> { chat.displayName }
        </Menu.Item>
      </Sidebar>
      <Sidebar.Pusher>
        {!!user.groupId ? <HeaderBlock /> : ''}
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
  );
}

export default Nav;
