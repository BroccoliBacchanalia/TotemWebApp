import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Grid, Image, Button, Modal } from 'semantic-ui-react';
import store from '../../redux/store'
import localStyles from './GroupStyles.css';
import GroupMemberModal from './GroupMemberModal'
import { localTimeMilliseconds } from '../helperFunctions';
import { getGeofence, showGroupMemberInfo } from '../../redux/actions';

const GroupRow = ({ friend, uid }) => {
  const geofence = friend.geofence;
  let artist = geofence && geofence.key ? getArtist(geofence.key) : '';
  artist = artist ? ' - ' + artist : '';

  return (
    <Grid.Row className={localStyles.gRow}>
      <Grid.Column width={3} className={localStyles.imageDiv}>
        <Image src={friend.img} />
      </Grid.Column>
      <Grid.Column className={localStyles.centerDiv}>
        <span className="h4">{friend.label}</span>
        <br />
        {geofence && geofence.name ? <div>{geofence.name + artist}<br /></div> : ''}
        <span className={localStyles.timestamp}> Last updated:
          { ' ' + moment(friend.position.timestamp).fromNow() }
        </span>
      </Grid.Column>
      <Grid.Column width={3} className={localStyles.buttonDiv}>
        <GroupMemberModal friend={friend} uid={uid} artist={artist}/>
      </Grid.Column>
    </Grid.Row>
  );
}

function getArtist(key) {
  const currentTime = new Date().getTime();
  const scheduleItems = store.getState().venue.venue.scheduleitems;
  const geoFences = store.getState().venue.geofences;
  const userGeofence = geoFences[key];


  for (var i = 0; i < scheduleItems.length; i++) {
    const item = scheduleItems[i];
    if (userGeofence && item) {
      if (userGeofence.name === item.geofence) {
        const startTime = localTimeMilliseconds(Date.parse(item.starttime));
        const endTime = localTimeMilliseconds(Date.parse(item.endtime));
        const timeInRange = startTime <= currentTime && currentTime < endTime;

        if (timeInRange) {
          return item.name.toProperCase();
        }
      }
    }
  }
}

export default GroupRow;
