import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Grid, Image, Button, Modal } from 'semantic-ui-react';
import store from '../../redux/store'
import localStyles from './GroupStyles.css';
import GroupMemberModal from './GroupMemberModal'
import { localTimeMilliseconds } from '../helperFunctions';
import { getGeofence, showGroupMemberInfo } from '../../redux/actions';

var mockScheduleItems =
  [ {
    "day" : "2017-03-08T07:00:00.000Z",
    "endtime" : "2017-03-08T16:00:00",
    "geofence" : "Yuma Tent",
    "imgurl" : "https://s3.amazonaws.com/gv-account-assets/artist-images/20172/586ad6d8980c3/586ad6d898157.jpg",
    "name" : "DILLON FRANCIS",
    "starttime" : "2017-03-08T15:00:00"
  }, {
    "day" : "2017-03-08T07:00:00.000Z",
    "endtime" : "2017-03-08T17:00:00",
    "geofence" : "Sahara Tent",
    "imgurl" : "https://s3.amazonaws.com/gv-account-assets/artist-images/20172/586ad6d89e862/586ad6d89e914.jpg",
    "name" : "EMPIRE OF THE SUN",
    "starttime" : "2017-03-08T16:00:00"
  }, {
    "day" : "2017-03-08T07:00:00.000Z",
    "endtime" : "2017-03-08T18:00:00",
    "geofence" : "Mojave Tent",
    "imgurl" : "https://s3.amazonaws.com/gv-account-assets/artist-images/20172/586ad6d8a04f6/586ad6d8a0579.jpg",
    "name" : "KING GIZZARD AND THE LIZARD WIZARD",
    "starttime" : "2017-03-08T17:00:00"
  }];

const GroupRow = ({ friend, uid }) => {
  const geofence = friend.position ? getGeofence(friend.position) : false;
  let artist = geofence.key ? getArtist(geofence.key) : '';
  artist = artist ? ' - ' + artist : '';

  return (
    <Grid.Row className={localStyles.gRow}>
      <Grid.Column width={3} className={localStyles.imageDiv}>
        <Image src={friend.img} />
      </Grid.Column>
      <Grid.Column className={localStyles.centerDiv}>
        <span className="h4">{friend.label}</span>
        <br />
        {geofence.name ? <div>{geofence.name + artist}<br /></div> : ''}
        <span className={localStyles.timestamp}> Last updated: 
          { ' ' + moment(friend.position.timestamp).fromNow() }
        </span>
      </Grid.Column>
      <Grid.Column width={3} className={localStyles.buttonDiv}>
        <GroupMemberModal friend={friend} uid={uid} />
      </Grid.Column>
    </Grid.Row>
  );
}

function getArtist(key) {
  const currentTime = new Date().getTime();
  const scheduleItems = mockScheduleItems; //store.getState().venue.venue.scheduleitems;
  const geoFences = store.getState().venue.geofences;
  const userGeoFence = geoFences[key];

  for (var i = 0; i < scheduleItems.length; i++) {
    const item = scheduleItems[i];
    if (userGeoFence.name === item.geofence) {
      const startTime = localTimeMilliseconds(Date.parse(item.starttime));
      const endTime = localTimeMilliseconds(Date.parse(item.endtime));
      const timeInRange = startTime <= currentTime && currentTime < endTime;

      if (timeInRange) {
        return item.name.toProperCase();
      }
    }
  }
}

export default GroupRow;
