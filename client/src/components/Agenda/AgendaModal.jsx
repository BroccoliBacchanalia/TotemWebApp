import React from 'react';
import localStyles from './AgendaStyles.css';
import { connect } from 'react-redux';
import { getGeofence, showGroupMemberInfo, getStagesAndDays, updateDay } from '../../redux/actions';
import { Grid, Image, Button, Modal, Icon, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import moment from 'moment';



const AgendaModal = ({ itemKey, name, startTime, endTime, geofence, day, imgurl, venueSchedule, venue, user, users }) => {
  return (
    <Modal 
       className={localStyles.modal} 
       trigger={
         <Button className={localStyles.ellipsis} size='large'>
           <Icon name='vertical ellipsis' size='large'/>
         </Button>
       } 
       closeIcon='close'>
      <Modal.Header>{ name }</Modal.Header>
      <Modal.Content id={localStyles.mContent}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <Image className={localStyles.mImage} wrapped size='small' src={imgurl} />
            </Grid.Column>
            <Grid.Column width={8} className={localStyles.mInfo}>
              <div className={localStyles.mStage}>{geofence}</div>
              <div className={localStyles.mDay}>{moment(day).format('dddd') + ', ' + moment(day).format('MMM Do')}</div>
              <div className={localStyles.mTime}>{startTime + ' - ' + endTime}</div>
              <div className={localStyles.mTime}>{moment(day).startOf('hour').fromNow()}</div>
           </Grid.Column>


          </Grid.Row>
        </Grid>
        <Modal.Description>
          <Header className={localStyles.mHeader}>Who else is going?</Header>
          {Object.keys(users).map((userKey, index) => {
            const friend = users[userKey];
            if (friend && userKey !== user.uid && Object.keys(friend.agenda).includes(itemKey)) { return friend.label }
          })}



        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
  
}

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

export default connect((store) => {
  return {
    user: store.user,
    users: store.group.members
  };
})(AgendaModal);



