import React from 'react';
import firebase from 'firebase';
import localStyles from './AgendaStyles.css';
import { removeAgenda } from '../../redux/actions/agendaActions';

function removeAgendaItem(key) {

  const uid = firebase.auth().currentUser.uid;
  const db = firebase.database();
  db.ref('users/' + uid + '/agenda/' + key).remove()
  .then(function(){
   // fetch data after removing agenda
    const updateRef = db.ref('users/'+ uid +'/agenda/');

    updateRef.on("value", function(snapshot) {
      let agenda  =  snapshot.val();
      console.log("REMOVED AGENDA: ", agenda);
      agenda = Object.keys(agenda);
      agenda = agenda.slice(0,agenda.length-1);
      removeAgenda(agenda)
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

  });
}

const AgendaRow = ({ itemKey, name, startTime, endTime, geofence, day, imgurl }) => (
  <div
    type="button"
    className={localStyles.gRow + " clearfix"}
    onClick={removeAgendaItem.bind(null, itemKey)}>
    <img src={imgurl}/>
      <p>
        <span className="h3">{name}</span>
        <br/>
        <span>{geofence}</span>
        <br/>
        {startTime.slice(0,-6)+" "+startTime.slice(startTime.length-2)+" "+
          " - "+endTime.slice(0,-6)+" "+endTime.slice(endTime.length-2)}
      </p>
  </div>
);

export default AgendaRow;