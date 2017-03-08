import React from 'react';
import localStyles from './GroupStyles.css';
import { connect } from 'react-redux';
import { getGeofence, showGroupMemberInfo, getStagesAndDays, updateDay } from '../../redux/actions';
import { Grid, Image, Button, Modal } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


const GroupMemberModal = ({ friend, uid, venueSchedule, venue, user }) => {
  const { days } = getStagesAndDays(venue.scheduleitems);
  let agenda;
  let pAgenda;
  user.agenda ? pAgenda = user.agenda : pAgenda = [];
  friend.agenda ? agenda = Object.keys(friend.agenda) : agenda = [];
  const selectedDay = venueSchedule.selectedDay || days[Object.keys(days)[0]];
  return (
   <Modal
      className={localStyles.modal}
      trigger={<Button className={localStyles.ellipsis} size='large' icon='vertical ellipsis'/>}
      closeIcon='close'>

      <Modal.Header className={localStyles.mHeader}>
        {friend.label}
         <nav className={localStyles.mSelector}>
          <select
            id="days-dropdown"
            className="ui selection fluid dropdown group-modal"
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
            <Grid.Column width={7} className={localStyles.mCenterDiv}>
              <div className={localStyles.mGeofence}>{friend.position ? getGeofence(friend.position) : ''}</div>
              <div className={localStyles.mArtistName}>Place holder for artist</div>
              <div className={localStyles.timestamp}> Last updated: { ' ' + 
                new Date(friend.position.timestamp).toString().substring(0, 3) + ' ' +
                new Date(friend.position.timestamp).toString().substring(15, 21)}
              </div>
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
              <Button
                basic
                className={localStyles.button}
                icon='comment outline'
                size='large'
                href={'https://m.me/' + friend.facebookID}/>
            </Grid.Column>
          </Grid.Row>
          {agenda.map((key) => {
            const item = venue.scheduleitems[key];
            if (item && (item.day === selectedDay)) {
              return (
                <Grid.Row className={localStyles.agenda} key={key}>
                  <Grid.Column width={4} className={pAgenda.includes(key) ? localStyles.includesAgendaCol : localStyles.agendaCol}>{item.starttime}</Grid.Column>
                  <Grid.Column width={7} className={pAgenda.includes(key) ? localStyles.includesAgendaCol : localStyles.agendaCol}>{item.name}</Grid.Column>
                  <Grid.Column width={5} className={pAgenda.includes(key) ? localStyles.includesAgendaCol : localStyles.agendaCol}>{item.geofence}</Grid.Column>
                </Grid.Row>
              )
            }
          })}
        </Grid>
      </Modal.Content>
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
