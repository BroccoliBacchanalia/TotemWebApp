import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Image, Button, Modal, Icon, Header } from 'semantic-ui-react';
import moment from 'moment';
import LeaveGroupModal from './LeaveGroupModal';
import FacebookIDModal from './FacebookIDModal'
import styles from '../Styles.css';
import localStyles from './GroupStyles.css';
import { getGeofence, showGroupMemberInfo, getStagesAndDays, updateDay } from '../../redux/actions';


const GroupMemberModal = ({ friend, uid, venueSchedule, venue, user, artist }) => {
  let agenda;
  let pAgenda;
  const { days } = getStagesAndDays(venue.scheduleitems);
  const selectedDay = venueSchedule.selectedDay || days[Object.keys(days)[0]];
  user.agenda ? pAgenda = user.agenda : pAgenda = [];
  friend.agenda ? agenda = Object.keys(friend.agenda) : agenda = [];

  return (
    <Modal
      className={localStyles.modal}
      closeIcon='close'
      trigger={
        <Button className={localStyles.ellipsis} size='large'>
          <Icon name='vertical ellipsis' size='large'/>
        </Button>
    }>

      <Modal.Header className={localStyles.mHeader}>
        {friend.label}
         <nav className={localStyles.mSelector}>
          <select
            id="days-dropdown"
            className={styles.select + 'ui selection fluid dropdown group-modal'}
            value={selectedDay}
            onChange={updateValue.bind(this, 'days-dropdown')}>
            {Object.keys(days).map((day, i) => (
              <option key={i} value={days[day]}>{day}</option>
            ))}
          </select>
        </nav>
      </Modal.Header>


      <Modal.Content id={localStyles.mContent}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <Image className={localStyles.modalImage} wrapped size='tiny' src={friend.img} />
            </Grid.Column>
            <Grid.Column className={localStyles.mCenterDiv}>
              <div className={localStyles.mGeofence}>
                {friend.position ?
                getGeofence(friend.position).name :
                 ''}
               </div>
              <div className={localStyles.mArtistName}>{artist}</div>
              <div className={localStyles.timestamp}> Last updated: { ' ' + moment(friend.position.timestamp).calendar()}</div>
            </Grid.Column>
            <Grid.Column width={5} className={localStyles.mButtonDiv}>
              <Link to='/map'>
                <Button
                  basic
                  className={localStyles.button}
                  icon='marker'
                  size='large'
                  onClick={() => {showGroupMemberInfo(uid)}}/>{' '}
              </Link>
              {uid === user.uid && <FacebookIDModal />}
              {uid !== user.uid &&
              <Button
                basic
                className={localStyles.button}
                icon='comment outline'
                size='large'
                href={friend.facebookUsername ? 'https://m.me/' + friend.facebookUsername : ''}
                onClick={() => {
                  !friend.facebookUsername ? alert('This user has not synched with messenger') : ''
                }}/>
              }
            </Grid.Column>
          </Grid.Row>
          {agenda.map((key) => {
            const item = venue.scheduleitems[key];
            if (item && (item.day === selectedDay)) {
              return (
                <Grid.Row className={localStyles.agenda} key={key}>
                  <Grid.Column width={4} className={pAgenda.includes(key) ? localStyles.includesAgendaColTime : localStyles.agendaColTime}>{moment(item.starttime).format('h:mm a')}</Grid.Column>
                  <Grid.Column className={pAgenda.includes(key) ? localStyles.includesAgendaCol : localStyles.agendaCol}>{item.name}</Grid.Column>
                  <Grid.Column width={5} className={pAgenda.includes(key) ? localStyles.includesAgendaCol : localStyles.agendaCol}>{item.geofence}</Grid.Column>
                </Grid.Row>
              )
            }
          })}
        </Grid>
      </Modal.Content>
      {uid === user.uid && <LeaveGroupModal />}
    </Modal>
  )
}


function updateValue(id, e) {
  return updateDay(document.getElementById(id).value);
}

export default connect((store) => {
  return {
    venueSchedule: store.venueSchedule,
    venue: store.venue.venue,
    user: store.user
  };
})(GroupMemberModal);
