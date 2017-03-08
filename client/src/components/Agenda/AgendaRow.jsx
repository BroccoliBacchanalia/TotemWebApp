import React from 'react';
import localStyles from './AgendaStyles.css';
import { Grid, Image, Icon } from 'semantic-ui-react';
<<<<<<< HEAD
/* Actions */
import { removeAgenda } from '../../redux/actions/userActions';

function removeAgendaItem(key) {
  const uid = firebase.auth().currentUser.uid;
  const db = firebase.database();
  db.ref('users/' + uid + '/agenda/' + key).remove()
  .then(function(){
   // fetch data after removing agenda
    const updateRef = db.ref('users/'+ uid +'/agenda/');

    updateRef.on("value", (snapshot) => {
      let agenda = snapshot.val();
      if (agenda) {
        agenda = Object.keys(agenda);
      }
      removeAgenda(agenda)
    },  (errorObject) => {
      console.log("The read failed: " + errorObject.code);
    });
  });
}
import AgendaModal from './AgendaModal'

const AgendaRow = ({ itemKey, name, startTime, endTime, geofence, day, imgurl }) => (
  <Grid.Row className={localStyles.aRow}>
    <Grid.Column className={localStyles.imageDiv} width={3}>
      <Image src={imgurl}/>
    </Grid.Column>
    <Grid.Column className={localStyles.centerDiv}>
      <span className='h4'>{name}</span>
      <br/>
      <span className='h5'>{geofence}</span>
      <br/>
      {startTime.slice(0,-6)+" "+startTime.slice(startTime.length-2)+" "+
        " - "+endTime.slice(0,-6)+" "+endTime.slice(endTime.length-2)}
    </Grid.Column>
    <Grid.Column
      className={localStyles.clickingDiv}
      width={3}>
      <AgendaModal 
        itemKey={itemKey}
        name={name}
        startTime = {startTime}
        endTime = {endTime}
        geofence={geofence}
        day={day}
        id='agenda'
        imgurl={imgurl}
      />
    </Grid.Column>
  </Grid.Row>
);

export default AgendaRow;


