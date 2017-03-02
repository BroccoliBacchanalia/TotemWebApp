import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ContactFriends from './ContactFriends.jsx'
import Avatar from 'material-ui/Avatar';
import { connect } from 'react-redux';
import { SpeedDial, BubbleList, BubbleListItem } from 'react-speed-dial';
import { getGeofence, toggleEmergencyFriends, toggleEmergencyServices, toggleSpeedDial } from '../../redux/actions'



const list = {
  items: [
    {
      primaryText: 'Highlight Emergency Tents',
      leftAvatar: <Avatar src='/img/emergency-tent.png' />,
      onClick: function() {console.log(true);}
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
    }
  ]
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
