import React from 'react';
import store from '../../redux/store';
import { connect } from 'react-redux';
import { firebaseOnce, firebaseUpdate } from '../../redux/actions/firebaseActions';
import { toggleAddRemove } from '../../redux/actions/agendaActions';
import { addAgenda } from '../../redux/actions/userActions';
import localStyles from './VenueStyles.css';
import { Grid, Image, Icon, Button } from 'semantic-ui-react'
var addRemoveClass;
const ScheduleRow = ({ itemKey, name, startTime, endTime, geofence, day, imgurl, venueSchedule }) => (
  
  <Grid.Row className={localStyles.sRow}>
    <Grid.Column width={3}>
      <Image src={imgurl} />
    </Grid.Column>
    <Grid.Column width={10}>
      <span className="h4">{name}</span>
      <br />
      <span className="h5">{geofence}</span>
      <br />
      {startTime.slice(0,-6)+" "+startTime.slice(startTime.length-2)+" "+
        " - "+endTime.slice(0,-6)+" "+endTime.slice(endTime.length-2)}
    </Grid.Column>
    <Grid.Column 
      width={3} 
      onClick={() => { 
        console.log('clicked')
        addRemoveClass = venueSchedule.isToggle ? 'add circle' : 'remove circle'
        addAgendaItem(itemKey)
        toggleAddRemove()
      }}>
      <Icon 
        className={localStyles.addButton}
        name={addRemoveClass || 'add circle'} 
        size='big' 
      />
    </Grid.Column>
  </Grid.Row>
);

function addAgendaItem(key) {
  console.log("in add agedna");
  const uid = store.getState().user.uid;
  const updates = {};

  updates[`users/${ uid }/agenda/${key}`] = true;
  firebaseUpdate(updates);

  //fetch new agenda
  firebaseOnce('users/'+ uid +'/agenda/', (agenda) => {
    agenda = Object.keys(agenda);
    addAgenda(agenda);
  });
}


export default connect((store) => {
  return {
    venue: store.venue.venue,
    venueSchedule: store.venueSchedule
  };
})(ScheduleRow);