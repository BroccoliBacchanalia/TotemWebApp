import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ContactFriends from './ContactFriends.jsx'
import Avatar from 'material-ui/Avatar';
import { connect } from 'react-redux';
import { SpeedDial, BubbleList, BubbleListItem } from 'react-speed-dial';
import { getGeofence, toggleDimmer, toggleEmergencyFriends, toggleEmergencyServices, toggleSpeedDial } from '../../redux/actions'



class SpeedDialButton extends Component {
  render() {
    const { app, user, group } = this.props;
    const list = {
      items: [
        {
          primaryText: 'Highlight Emergency Tents',
          leftAvatar: <Avatar src='/img/emergency-tent.png' />,
          onClick: console.log(true)
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
    return (
      <div>
        <MuiThemeProvider>
          <SpeedDial positionH='left' positionV='bottom'>
            <BubbleList>
              {list.items.map((item, index) => {
                return ( <BubbleListItem key={ index } { ...item } /> );
              })}
            </BubbleList>
          </SpeedDial>
        </MuiThemeProvider>
      </div>
    );
  };
}

//className={app.speedDial ? '' : 'hidden' } 

SpeedDialButton.displayName = 'SpeedDialButton';

export default connect((store) => {
  return {
    app: store.app,
    user: store.user,
    group: store.group
  };
})(SpeedDialButton);