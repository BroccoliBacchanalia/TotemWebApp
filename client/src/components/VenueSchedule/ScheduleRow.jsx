import React from 'react';
import store from '../../redux/store';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { firebaseOnce, firebaseUpdate } from '../../redux/actions/firebaseActions';
import { addAgenda, removeAgenda } from '../../redux/actions/userActions';
import localStyles from './VenueStyles.css';
import { Grid, Image, Icon, Button } from 'semantic-ui-react'
const ScheduleRow = ({ user, itemKey, name, startTime, endTime, geofence, day, imgurl, venueSchedule }) => (
  
  <Grid.Row className={(user.agenda && user.agenda.includes(itemKey)) ? localStyles.sRowSelected : localStyles.sRow}>
    <Grid.Column width={3} className={localStyles.imageDiv}>
      <Image src={imgurl} />
    </Grid.Column>
    <Grid.Column width={10}>
      <span className="h4">{name}</span>
      <br />
      <span className="h5">{geofence}</span>
      <br />
      <div className="time">
      {startTime.slice(0,-6)+" "+startTime.slice(startTime.length-2)+" "+
        " - "+endTime.slice(0,-6)+" "+endTime.slice(endTime.length-2)}
      </div>
    </Grid.Column>
    <Grid.Column 
      className={localStyles.clickingDiv}
      width={3} 
      onClick={(user.agenda && user.agenda.includes(itemKey)) ? 
        () => { removeAgendaItem(itemKey) } :
        () => { addAgendaItem(itemKey) }
      }>
      <Icon 
        className={(user.agenda && user.agenda.includes(itemKey)) ? localStyles.removeButton : localStyles.addButton}
        name={(user.agenda && user.agenda.includes(itemKey)) ? 'remove circle' : 'add circle'} 
        size='big' 
      />
    </Grid.Column>
  </Grid.Row>
);

function addAgendaItem(key) {
  const uid = store.getState().user.uid;
  const updates = {};

  updates[`users/${ uid }/agenda/${key}`] = true;
  firebaseUpdate(updates);

  //fetch new agenda
  firebaseOnce('users/'+ uid +'/agenda/', (agenda) => {
    agenda = Object.keys(agenda);
    console.log('after addition', agenda);
    addAgenda(agenda);
  });
}

function removeAgendaItem(key) {
  const uid = store.getState().user.uid;
  const db = firebase.database();
  db.ref('users/' + uid + '/agenda/' + key).remove()
  .then(() => {
   // fetch data after removing agenda
    const updateRef = db.ref('users/'+ uid +'/agenda/');

    updateRef.on("value", (snapshot) => {
      let agenda  =  snapshot.val();
      if (agenda) {
        agenda = Object.keys(agenda);
      }
      console.log('after remove', agenda)
      removeAgenda(agenda)
    },  (errorObject) => {
      console.log("The read failed: " + errorObject.code);
    });
  });
}


export default connect((store) => {
  return {
    user: store.user,
    venue: store.venue.venue,
    venueSchedule: store.venueSchedule
  };
})(ScheduleRow);