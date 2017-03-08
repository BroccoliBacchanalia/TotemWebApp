import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Grid, Image, Button, Modal } from 'semantic-ui-react';

import store from '../../redux/store'
import localStyles from './GroupStyles.css';
import { getGeofence, showGroupMemberInfo } from '../../redux/actions';
import GroupMemberModal from './GroupMemberModal'

var mockScheduleItems = [{
  "day" : "2017-03-07T17:05:44.766Z",
  "endtime" : "6:00:00 PM",
  "geofence" : "Coachella Stage",
  "imgurl" : "https://s3.amazonaws.com/gv-account-assets/artist-images/20172/586ad6d88f669/586ad6d88f70b.jpg",
  "name" : "gobi",
  "starttime" : "5:00:00 PM"
}, {
  "day" : "2017-03-07T17:05:44.766Z",
  "endtime" : "8:59:00 PM",
  "geofence" : "Mojave",
  "imgurl" : "https://s3.amazonaws.com/gv-account-assets/artist-images/20172/586ad6d8a8b2b/586ad6d8a8bd1.jpg",
  "name" : "GOLDLINK",
  "starttime" : "8:40:00 PM"
}, {
  "day" : "2017-03-07T17:05:44.766Z",
  "endtime" : "6:00:00 PM",
  "geofence" : "sahara",
  "imgurl" : "https://s3.amazonaws.com/gv-account-assets/artist-images/y/j/g/losblenders600.jpg",
  "name" : "LOS BLENDERS",
  "starttime" : "5:51:00 PM"
}];

const GroupRow = ({ friend, uid }) => {
  const geofence = friend.position ? getGeofence(friend.position) : false;
  let artist = getArtist(geofence, friend.position.timestamp);
  artist = artist.length > 0 ? ' - ' + artist : artist;

  return (
    <Grid.Row className={localStyles.gRow}>
      <Grid.Column width={3} className={localStyles.imageDiv}>
        <Image src={friend.img} />
      </Grid.Column>
      <Grid.Column className={localStyles.centerDiv}>
        <span className="h4">{friend.label}</span>
        <br />
        {geofence ? <div>{geofence + artist}<br /></div> : ''}
        <span className={localStyles.timestamp}> Last updated: { ' ' +
          new Date(friend.position.timestamp).toString().substring(0, 3) + ' ' +
          new Date(friend.position.timestamp).toString().substring(15, 21)}
        </span>
      </Grid.Column>
      <Grid.Column width={3} className={localStyles.buttonDiv}>
        <GroupMemberModal friend={friend} uid={uid} />
      </Grid.Column>
    </Grid.Row>
  );
}

function timeInRange(starttime, endtime, date, currentTime_ms) {
  let startTime_ms = getMillisecond(date, starttime);
  let endTime_ms = getMillisecond(date, endtime);

  if (currentTime_ms >= startTime_ms && currentTime_ms <= endTime_ms) {
    return true;
  }
  return false;
}

function getMillisecond(date, time) {
  let today = new Date(date);
  let momentObj = moment(time, ["h:mm:ss A"]);

  momentObj = (momentObj.format("HH:mm:ss")).split(":");
  today.setHours(momentObj[0], momentObj[1], momentObj[2]);

  return today.getTime();
}

function getArtist(geofence, currentTime) {
  if (!currentTime) currentTime = new Date().getTime();
  if(!!geofence) return '';
  const scheduleItems = mockScheduleItems; //store.getState().venue.venue.scheduleitems;

  geofence = geofence.toLowerCase();

  const result = mock.filter((item) => {
    const stage = item.geofence.toLowerCase();
    const isAtStage = stage.indexOf(geofence) !== -1 || geofence.indexOf(stage) !== -1;
    const isInRange = timeInRange(item.starttime, item.endtime, item.day, currentTime);
    if (isAtStage && isInRange) {
      return true
    }
    return false
  });

  if (result.length !== 0) return result[0].name;
  return '';
}


export default GroupRow;
