import React from 'react';
import firebase from 'firebase';
import localStyles from './AgendaStyles.css';
import { Grid, Image, Icon } from 'semantic-ui-react';
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
      width={3}
      onClick={removeAgendaItem.bind(null, itemKey)}>
      <Icon
        className={localStyles.removeButton}
        name='remove circle'
        size='big'
      />
    </Grid.Column>
  </Grid.Row>
);

export default AgendaRow;
