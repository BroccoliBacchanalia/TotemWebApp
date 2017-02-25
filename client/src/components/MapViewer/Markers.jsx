import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Marker, InfoWindow } from 'react-google-maps';
import { toggleName } from '../../redux/actions/authenticationActions'
import store from '../../redux/store.js';

class MapViewer extends Component {
  render() {
    const users = this.props.users;
    const userKeys = Object.keys(users);

    return (
      <div>
        {userKeys.map((userKey, index) => {
          const user = users[userKey];
          const icon = {
            url: user.img,
            scaledSize: new google.maps.Size(30, 30),
            origin: new google.maps.Point(0,0),
            anchor: new google.maps.Point(0, 0),
            labelOrigin: new google.maps.Point(15, 35)
          };
          return (
            <Marker
              key={index}
              {...user}
              icon={icon}
              onClick={() => store.dispatch({type: 'show_name', payload: {showInfo: true}})}
            >
              {user.showInfo && (
                <InfoWindow>
                  <div>{user.label}</div>
                </InfoWindow>
              )}
            </Marker>
          );
        })}
      </div>
    );
  }
}

export default connect((store) => {
  return {
    users: store.location.users,
  };
})(MapViewer);
