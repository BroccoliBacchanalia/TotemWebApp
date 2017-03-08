import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Marker, InfoWindow } from 'react-google-maps';
import store from '../../redux/store.js';
import { getGeofence, showGroupMemberInfo } from '../../redux/actions';
import { showTotemInfo } from '../../redux/actions/groupActions';

export class Markers extends Component {
  render() {
    const members = this.props.members;
    const userIds = Object.keys(members);
    const basecamp = {
      url: 'img/loading.gif',
      scaledSize: new google.maps.Size(50, 96),
      origin: new google.maps.Point(0,0),
      anchor: new google.maps.Point(25, 96)

    };
    const totemCoords = this.props.totem.coords;
    const basecampExists = Object.keys(this.props.totem.coords).length > 0;

    return (
      <div>
        {basecampExists &&
          <Marker
            label=''
            icon={basecamp}
            position={totemCoords}
            onClick={showTotemInfo}
          >
            {this.props.showTotemInfo && (
              <InfoWindow>
                <div>
                  <div>Bascamp</div>
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
                    { new Date(user.position.timestamp).toString().substring(0, 3) + ' ' +
                      new Date(user.position.timestamp).toString().substring(15, 21) }
                  </div>
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
    members: store.group.members,
    totem: store.group.totem,
    showTotemInfo: store.group.showTotemInfo
  };
})(Markers);
