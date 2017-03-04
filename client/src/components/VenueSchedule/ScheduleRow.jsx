import React from 'react';
import store from '../../redux/store';
import { firebaseOnce, firebaseUpdate } from '../../redux/actions/firebaseActions';
import { addAgenda } from '../../redux/actions/agendaActions';
import localStyles from './VenueStyles.css';
import { Grid, Button, Image, Icon } from 'semantic-ui-react'

const ScheduleRow = ({ itemKey, name, startTime, endTime, geofence, day, imgurl }) => (
  
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
      className={localStyles.buttonDiv}
      onClick={() => { 
        console.log('clicked')
        addAgendaItem.bind(null, itemKey);
      }}>
        <Icon 
          className={localStyles.addButton}
          name='add circle' 
          size='big' 
        />
     
    </Grid.Column>
  </Grid.Row>





  // <div
  //   type="button"
  //   className={localStyles.gRow + " clearfix"}
  //   onClick={addAgendaItem.bind(null, itemKey)}>
  //   <img src={ imgurl }/>
  //   <p>
  //     <span className="h3">{name}</span>
  //     <br/>
  //     {startTime.slice(0,-6)+" "+startTime.slice(startTime.length-2)+" "+
  //       " - "+endTime.slice(0,-6)+" "+endTime.slice(endTime.length-2)}
  //   </p>
  // </div>
);

function addAgendaItem(key) {
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

export default ScheduleRow;
