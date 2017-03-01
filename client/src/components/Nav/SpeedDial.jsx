import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ContactFriends from './ContactFriends.jsx'
import Avatar from 'material-ui/Avatar';
import { SpeedDial, BubbleList, BubbleListItem } from 'react-speed-dial';
import { toggleDimmer, toggleEmergencyFriends, toggleEmergencyServices } from '../../redux/actions'

const avatarImgUrl = 'http://lorempixel.com/80/80/people';
const list = {
  items: [
    {
      primaryText: 'Highlight Emergency Tents',
      leftAvatar: <Avatar src='/img/emergency-tent.png' />,
      onClick: console.log('highlight tents')
    },
    {
      primaryText: 'Alert Your Friends',
      leftAvatar: <Avatar src='/img/friend-alert.png' />,
      onClick: toggleEmergencyFriends
    },
    {
      primaryText: 'Contact Emergency Services',
      leftAvatar: <Avatar src='/img/ambulance.png' />,
      onClick: toggleEmergencyServices
    },
  ],
};


const SpeedDialButton = (props) => {
  return (
    <MuiThemeProvider>
      <SpeedDial positionH='left' positionV='bottom'>
        <BubbleList>
          {list.items.map((item, index) => {
            return ( <BubbleListItem key={ index } { ...item } /> );
          })}
        </BubbleList>
      </SpeedDial>
    </MuiThemeProvider>
  );
};

SpeedDialButton.displayName = 'SpeedDialButton';

export default SpeedDialButton;
