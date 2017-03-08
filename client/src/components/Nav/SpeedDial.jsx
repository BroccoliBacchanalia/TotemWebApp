import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ContactFriends from './ContactFriends.jsx'
import Avatar from 'material-ui/Avatar';
import { connect } from 'react-redux';
import { SpeedDial, BubbleList, BubbleListItem } from 'react-speed-dial';
import { getGeofence, toggleEmergencyFriends, toggleEmergencyServices, toggleSpeedDial } from '../../redux/actions'
import { localStyles } from './UtilStyles.css'

class SpeedDialButton extends Component {
  render() {
    const list = {
      items: [
        {
          primaryText: 'Place a Totem',
          leftAvatar: <Avatar src='/img/totemsquare.png' />,
          onClick: () => {
            console.log(true);
            this.refs['speedDial'].handleClickClose();
          }
        },
        {
          primaryText: 'Alert Your Friends',
          leftAvatar: <Avatar src='/img/friend-alert.png' />,
          onClick: () => {
            toggleEmergencyFriends();
            this.refs['speedDial'].handleClickClose();
          }
        },
        {
          primaryText: 'Contact Emergency Services',
          leftAvatar: <Avatar src='/img/ambulance.png' />,
          onClick: () => {
            toggleEmergencyServices();
            this.refs['speedDial'].handleClickClose();
          }
        }
      ]
    };
    return (
      <MuiThemeProvider>
        <SpeedDial
          id='speedDial'
          ref='speedDial'
          positionH='left'
          positionV='bottom'
         >
          <BubbleList>
            {list.items.map((item, index) => {
              return ( <BubbleListItem key={ index } { ...item } /> );
            })}
          </BubbleList>
        </SpeedDial>
      </MuiThemeProvider>
    );
  };
}

SpeedDialButton.displayName = 'SpeedDialButton';

export default SpeedDialButton;
