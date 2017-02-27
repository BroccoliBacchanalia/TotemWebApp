import React from 'react';
import firebase from 'firebase';
import localStyles from './VenueStyles.css';

function addAgendaItem(key) {
  let uid = firebase.auth().currentUser.uid;
  const db = firebase.database();
  const updates = {};
  updates[`users/${ uid }/agenda/${key}`] = true;
  db.ref().update(updates);
}

const ScheduleRow = ({ itemKey, name, startTime, endTime, geofence, day }) => (
  <div
    type="button"
    className={localStyles.gRow + " clearfix"}
    onClick={addAgendaItem.bind(null, itemKey)}>
    <img src='./img/totem1.png'/>
     <p>
      <span className="h3">{name}</span>
      <br/>
      {startTime.slice(0,-6)+" "+startTime.slice(startTime.length-2)+" "+
        " - "+endTime.slice(0,-6)+" "+endTime.slice(endTime.length-2)}
    </p>
  </div>
);

export default ScheduleRow;
