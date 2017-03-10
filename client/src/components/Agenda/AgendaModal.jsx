import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeAgenda } from '../../redux/actions';
import { Grid, Image, Button, Modal, Icon, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import moment from 'moment';
import localStyles from './AgendaStyles.css';
import { removeAgendaItem } from '../../redux/actions/userActions';

class AgendaModal extends Component {
  state = { open: false }
  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  render() {
    const { itemKey, name, starttime, endtime, geofence, day, imgurl, user, users } = this.props;
    const { open } = this.state;
    return (
      <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
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
                <div className={localStyles.mTime}>{starttime + ' - ' + endtime}</div>
                <div className={localStyles.mTime}>{moment(day).startOf('hour').fromNow()}</div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Modal.Description>
            <Header className={localStyles.mHeader}>Who else is going?</Header>
            <p className={localStyles.mAttendingFriends}>
              {Object.keys(users).map((userKey, index) => {
                const friend = users[userKey];
                if (friend.agenda[itemKey] && userKey !== user.uid)  {
                  return friend.label + ' ' + index + ' '+ Object.keys(users).length + ', ';
                }
              })}
            </p>
          </Modal.Description>
        </Modal.Content>
        <Button
          className={localStyles.mButton}
          color='red'
          attached='bottom'
          onClick={() => {
            removeAgendaItem(itemKey)
            this.close();
          }}
        >
          Remove from Agenda
        </Button>
      </Modal>
    )
  }
}

export default connect((store) => {
  return {
    user: store.user,
    users: store.group.members
  };
})(AgendaModal);
