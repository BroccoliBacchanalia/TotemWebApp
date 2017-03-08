import React from 'react';
import store from '../../redux/store';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { firebaseOnce, firebaseUpdate } from '../../redux/actions/firebaseActions';
import { addAgendaItem, removeAgendaItem } from '../../redux/actions/userActions';
import localStyles from './VenueStyles.css';
import { Grid, Image, Icon, Button } from 'semantic-ui-react'

const ScheduleRow = ({ itemKey, item, user }) => {
  const { name, starttime, endtime, geofence, imgurl } = item;
  const hasAgendaItem = (user.agenda && user.agenda.includes(itemKey));

  return (
    <Grid.Row className={
      hasAgendaItem ?
      localStyles.sRowSelected :
      localStyles.sRow}
    >
      <Grid.Column width={3} className={localStyles.imageDiv}>
        <Image src={imgurl} />
      </Grid.Column>
      <Grid.Column className={localStyles.centerDiv}>
        <span className="h4">{name}</span>
        <br />
        <span className="h5">{geofence}</span>
        <br />
        <div className="time">
        {starttime.slice(0,-6)+" "+starttime.slice(starttime.length-2)+" "+
          " - "+endtime.slice(0,-6)+" "+endtime.slice(endtime.length-2)}
        </div>
      </Grid.Column>
      <Grid.Column
        className={localStyles.clickingDiv}
        width={3}
        onClick={hasAgendaItem ?
          () => { removeAgendaItem(itemKey) } :
          () => { addAgendaItem(itemKey) }
        }>
        <Icon
          className={
            hasAgendaItem ?
            localStyles.removeButton :
            localStyles.addButton}
          name={hasAgendaItem ? 'remove circle' : 'add circle'}
          size='big'
        />
      </Grid.Column>
    </Grid.Row>
  );
}

export default connect((store) => {
  return {
    user: store.user
  };
})(ScheduleRow);
