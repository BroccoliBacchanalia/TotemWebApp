import React from 'react';
import firebase from 'firebase';
import localStyles from './VenueStyles.css';
import { removeAgenda } from '../../redux/actions/venueScheduleActions.js';

function removeAgendaItem(key) {

  let uid = firebase.auth().currentUser.uid;
  var db = firebase.database();

  db.ref('users/'+uid+'/agenda/'+key).remove()
  .then(function(){
    
   // fetch data after removing agenda

    var updateRef = db.ref('users/'+ uid +'/agenda/');
    updateRef.on("value", function(snapshot) {
     
      let agenda  =  snapshot.val();
      agenda = Object.keys(agenda);
      agenda = agenda.slice(0,agenda.length-1);
      console.log("REMOVED AGENDA: ", agenda); 
      removeAgenda(agenda)  
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    console.log("INSIDE REMOVED AGENDA");

  }); 
}

const AgendaRow = ({ itemKey, name, startTime, endTime, geofence, day }) => (
  <div
    type="button"
    className={localStyles.gRow + " clearfix"}
    onClick={removeAgendaItem.bind(null, itemKey)}>
    <img src='./img/totem1.png'/>
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
