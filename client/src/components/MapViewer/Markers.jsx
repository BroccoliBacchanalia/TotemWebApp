import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Marker, InfoWindow } from 'react-google-maps';
import moment from 'moment'
import store from '../../redux/store.js';
import localStyles from './MapStyles.css';
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
    const milliSeconds = Date.parse(totem.meetupTime);

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
                  <h4>Basecamp</h4>
                  {totem.meetupTime && !placeTotem &&
                    <div>
                      <div>
                        {'Meet ' + moment(milliSeconds).fromNow()}
                      </div>
                      <div className={localStyles.subtext}>
                        {' at ' + moment(milliSeconds).format('h:mm A')}
                      </div>
                    </div>
                  }
                </div>
              </InfoWindow>
            )}
          </Marker>
        }

        {userIds.map((uid, index) => {
          const user = members[uid];

          if (user) {
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
                    <div className={localStyles.friendInfo}>
                      <h4>{user.label}</h4>
                      <div>
                        {user.geofence ? user.geofence.name : ''}
                      </div>
                      <span className={localStyles.subtext}>
                        {moment(user.position.timestamp).fromNow()}
                      </span>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            );
          }
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
