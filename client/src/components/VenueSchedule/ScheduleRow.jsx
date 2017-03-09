import React from 'react';
import { connect } from 'react-redux';
import { Grid, Image, Icon, Button } from 'semantic-ui-react'

import store from '../../redux/store';
import localStyles from './VenueStyles.css';

import { hourTimeFormat } from '../helperFunctions';
import { firebaseOnce, firebaseUpdate } from '../../redux/actions/firebaseActions';
import { addAgendaItem, removeAgendaItem } from '../../redux/actions/userActions';

const ScheduleRow = ({ itemKey, item, user }) => {
  let { starttime, endtime } = item;
  const { name,  geofence, imgurl } = item;
  const hasAgendaItem = (user.agenda && user.agenda.includes(itemKey));

  starttime = hourTimeFormat(starttime);
  endtime = hourTimeFormat(endtime);
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
          {starttime + ' - ' + endtime}
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
