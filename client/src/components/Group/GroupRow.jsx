import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Grid, Image, Button, Modal } from 'semantic-ui-react';
import store from '../../redux/store'
import localStyles from './GroupStyles.css';
import { getGeofence, showGroupMemberInfo } from '../../redux/actions';
import GroupMemberModal from './GroupMemberModal'


var mockScheduleItems =
  [ {
    "day" : "2017-04-14T07:00:00.000Z",
    "endtime" : "2017-04-14T23:00:00",
    "geofence" : "Yuma",
    "imgurl" : "https://s3.amazonaws.com/gv-account-assets/artist-images/20172/586ad6d8980c3/586ad6d898157.jpg",
    "name" : "DILLON FRANCIS",
    "starttime" : "2017-04-14T22:00:00"
  }, {
    "day" : "2017-04-14T07:00:00.000Z",
    "endtime" : "2017-04-14T23:00:00",
    "geofence" : "Sahara",
    "imgurl" : "https://s3.amazonaws.com/gv-account-assets/artist-images/20172/586ad6d89e862/586ad6d89e914.jpg",
    "name" : "EMPIRE OF THE SUN",
    "starttime" : "2017-04-14T22:00:00"
  }, {
    "day" : "2017-04-14T07:00:00.000Z",
    "endtime" : "2017-04-14T23:00:00",
    "geofence" : "Mojave",
    "imgurl" : "https://s3.amazonaws.com/gv-account-assets/artist-images/20172/586ad6d8a04f6/586ad6d8a0579.jpg",
    "name" : "FATHER JOHN MISTY",
    "starttime" : "2017-04-14T22:00:00"
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
        <span className={localStyles.timestamp}> Last updated:
          { ' ' + moment(friend.position.timestamp).add(3, 'days').calendar() }
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

  const result = scheduleItems.filter((item) => {
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
