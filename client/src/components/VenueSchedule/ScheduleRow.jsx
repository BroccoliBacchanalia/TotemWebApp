import React from 'react';
import firebase from 'firebase';
import localStyles from './VenueStyles.css';
import { addAgenda } from '../../redux/actions/agendaActions';
import store from '../../redux/store';

function addAgendaItem(key, name, startTime, endTime, geofence, day) {
  const uid = store.getState().user.uid;
  const db = firebase.database();
  const updates = {};
  updates[`users/${ uid }/agenda/${key}`] = true;
  db.ref().update(updates);

  //fetch new agenda
  var updateRef = db.ref('users/'+ uid +'/agenda/');
  updateRef.on("value", function(snapshot) {

    let agenda  =  snapshot.val();
    agenda = Object.keys(agenda);
    agenda = agenda.slice(0,agenda.length-1);
    console.log("ADDED AGENDA: ", agenda);
    addAgenda(agenda)
    //store.dispatch({type: 'add_agenda', payload: { agenda } });
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

}

const ScheduleRow = ({ itemKey, name, startTime, endTime, geofence, day }) => (
  <div
    type="button"
    className={localStyles.gRow + " clearfix"}
    onClick={addAgendaItem.bind(null, itemKey, name, startTime, endTime, geofence, day)}>
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
