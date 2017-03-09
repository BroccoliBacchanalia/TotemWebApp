import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
import { SpeedDial, BubbleList, BubbleListItem } from 'react-speed-dial';

import {
  toggleTotemModal,
  toggleEmergencyFriends,
  toggleEmergencyServices,
  toggleSpeedDial
} from '../../redux/actions'

class SpeedDialButton extends Component {
  render() {
    const history = this.context.history;
    const list = {
      items: [
        {
          primaryText: 'Place a Totem',
          leftAvatar: <Avatar src='/img/totemsquare.png' />,
          onClick: () => {
            toggleTotemModal(true);
            this.refs['speedDial'].handleClickClose();
            history.push('/map');
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

SpeedDialButton.contextTypes = {
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
    replace: React.PropTypes.func.isRequired,
    createHref: React.PropTypes.func.isRequired
  }).isRequired
};

SpeedDialButton.displayName = 'SpeedDialButton';

export default SpeedDialButton;
