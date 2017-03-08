import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Marker, InfoWindow } from 'react-google-maps';
import store from '../../redux/store.js';
import { getGeofence, showGroupMemberInfo } from '../../redux/actions';
import { toggleTotemInfo } from '../../redux/actions/groupActions';

export class Markers extends Component {
  render() {
    const { members, totem, showTotemInfo, placeTotem } = this.props;
    const userIds = Object.keys(members);
    const basecamp = {
      url: 'img/loading.gif',
      scaledSize: new google.maps.Size(50, 96),
      origin: new google.maps.Point(0,0),
      anchor: new google.maps.Point(25, 96)
    };
    const basecampExists = Object.keys(totem.coords).length > 0;
    const offset = new Date().getTimezoneOffset();
    const milliSeconds = Date.parse(totem.meetupTime) + (offset * 60 * 1000);

    return (
      <div>
        {basecampExists &&
          <Marker
            label=''
            icon={basecamp}
            position={totem.coords}
            onClick={toggleTotemInfo}
          >
            {showTotemInfo && (
              <InfoWindow>
                <div>
                  <div>Bascamp</div>
                  {totem.meetupTime && !placeTotem &&
                  <div>{this.formatDate(milliSeconds)}</div>}
                </div>
              </InfoWindow>
            )}
          </Marker>
        }

        {userIds.map((uid, index) => {
          const user = members[uid];

          const icon = {
            url: user.img,
            scaledSize: new google.maps.Size(30, 30),
            origin: new google.maps.Point(0,0),
            anchor: new google.maps.Point(15, 15),
            labelOrigin: new google.maps.Point(15, 35)
          };

          return (
            <Marker
              key={index}
              {...user}
              label=''
              icon={icon}
              onClick={() => showGroupMemberInfo(uid)}
            >
              {user.showInfo && (
                <InfoWindow>
                  <div>
                    <div>{user.label}</div>
                    <div>{getGeofence(user.position)}</div>
                    {this.formatDate(user.position.timestamp)}
                  </div>
                </InfoWindow>
              )}
            </Marker>
          );
        })}
      </div>
    );
  }

  formatDate(timeStamp) {
    return (new Date(timeStamp).toString().substring(0, 3) + ' ' +
      new Date(timeStamp).toString().substring(15, 21));
  }
}

export default connect((store) => {
  return {
    members: store.group.members,
    totem: store.group.totem,
    showTotemInfo: store.group.showTotemInfo,
    placeTotem: store.group.placeTotem
  };
})(Markers);
