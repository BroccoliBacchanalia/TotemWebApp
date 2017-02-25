import React from 'react';
import firebase from 'firebase';
//import totem from '../../../img/radar-icon.png';
// console.log(totem);
// /client/src/components/VenueSchedule/ScheduleRow.jsx
// /client/img
// import { Image, Text, View, Button } from 'react-native';
// import styles from '../../styles';
 import localStyles from './VenueStyles.css';
function here(name,startTime,endTime,geofence,day) {

  let uid = firebase.auth().currentUser.uid;
  const db = firebase.database();
  const agendaId = db.ref().child(`users/${ uid }/agenda`).push().key;
  const updates = {};
  console.log("agendaId: ",agendaId);
  updates[`users/${ uid }/agenda/${agendaId}`] = {
    name: name,
    startTime: startTime,
    endTime: endTime,
    geoFences: geofence,
    day: day
  };
  db.ref().update(updates);
}

const ScheduleRow = ({ name, startTime, endTime, geofence, day }) => (
  // <button onClick={here.bind(null,name,startTime,endTime,geofence,day)}>
  <div className={localStyles.gRow + " clearfix"}>
      <img src='./img/totem.png'/>
       <p>
        <span className="h4">{name}</span>
        <br/>
          {
            startTime.slice(0,-6)+" "+startTime.slice(startTime.length-2)+" "+
            " - "+endTime.slice(0,-6)+" "+endTime.slice(endTime.length-2)
          }
      </p>
  </div>
);

export default ScheduleRow;


