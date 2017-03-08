import React from 'react';
import localStyles from './GroupStyles.css';
import { getGeofence, showGroupMemberInfo } from '../../redux/actions';
import { Grid, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment';

var mock=[{
        "day" : "2017-03-07T17:05:44.766Z",
        "endtime" : "5:00:00 PM",
        "geofence" : "Coachella Stage",
        "imgurl" : "https://s3.amazonaws.com/gv-account-assets/artist-images/20172/586ad6d88f669/586ad6d88f70b.jpg",
        "name" : "gobi",
        "starttime" : "3:00:00 PM"
      }, {
        "day" : "2017-03-07T17:05:44.766Z",
        "endtime" : "5:30:00 PM",
        "geofence" : "Mojave",
        "imgurl" : "https://s3.amazonaws.com/gv-account-assets/artist-images/20172/586ad6d8a8b2b/586ad6d8a8bd1.jpg",
        "name" : "GOLDLINK",
        "starttime" : "4:37:00 PM"
      }, {
        "day" : "2017-03-07T17:05:44.766Z",
        "endtime" : "6:00:00 PM",
        "geofence" : "Yuma",
        "imgurl" : "https://s3.amazonaws.com/gv-account-assets/artist-images/y/j/g/losblenders600.jpg",
        "name" : "LOS BLENDERS",
        "starttime" : "5:00:00 PM"
      }]
let geofence;

const GroupRow = ({ friend, uid }) => (

    <Grid.Row className={localStyles.gRow}>
      <Grid.Column width={3} className={localStyles.imageDiv}>
        <Image src={friend.img} />
      </Grid.Column>
      <Grid.Column width={9} className={localStyles.centerDiv}>
        <span className="h4">{friend.label}</span>
        <br />
        {(geofence = friend.position ? getGeofence(friend.position) : '')}
        <br />
        {getArtist(geofence)}
        <br />
        <span className={localStyles.timestamp}> Last updated at: { ' ' + 
          new Date(friend.position.timestamp).toString().substring(0, 3) + ' ' + 
          new Date(friend.position.timestamp).toString().substring(15, 21)} 
        </span>
      </Grid.Column>
      <Grid.Column width={4} className={localStyles.buttonDiv}>
        <Link to='/map'>
          <Button
            basic
            className={localStyles.button}
            icon='marker'
            size='large'
            onClick={() => {showGroupMemberInfo(uid)}}/>{' '}
        </Link>
        <Button
          basic
          className={localStyles.button}
          icon='comment outline'
          size='large'
          href={'https://m.me/' + friend.facebookID}/>
      </Grid.Column>
    </Grid.Row>
);

function timeInRange(starttime, endtime, date) {

    let currentTime_ms = (new Date()).getTime();
    let startTime_ms = getMillisecond(date,starttime )
    let endTime_ms = getMillisecond(date, endtime)

    if(currentTime_ms>=startTime_ms && currentTime_ms<=endTime_ms)
      return true;
    return false;
}

function getMillisecond(date,time) {

  let momentObj = moment(time, ["h:mm:ss A"]);
  momentObj = (momentObj.format("HH:mm:ss")).split(":");
  let today = new Date(date);
  today.setHours(momentObj[0], momentObj[1], momentObj[2])
  return today.getTime();
}

function getArtist(geofence) {

  if(geofence === null || geofence === undefined || geofence === "")
    return "";

  geofence = geofence.toLowerCase();

  let result =  mock.filter(function(item){
    let stage = item.geofence.toLowerCase();
    if( (stage.indexOf(geofence) !== -1 || geofence.indexOf(stage) !== -1) 
      && timeInRange(item.starttime, item.endtime, item.day)) {
      return true
    }
    return false
  })
  if(result.length !== 0 )
    return result[0].name

  return "";
}


export default GroupRow;
