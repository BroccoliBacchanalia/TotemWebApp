import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Dimmer, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleTotemModal } from '../../redux/actions/appActions';
import { placeTotemOnClick, updateMeetupTime } from '../../redux/actions/groupActions';
import localStyles from './UtilStyles.css';

const PlaceTotem = ({ app, venue }) => {
  return (
    <Modal open={app.totemModal} basic size='fullscreen'>
      <Header
        className={localStyles.center + ' modal-header'}
        content='Place a Totem'
      />
      <div className={localStyles.center}>
        <img src='img/loading.gif' className={localStyles.totImg} />
      </div>
      <Modal.Content>
        <div className={localStyles.optionText}>
          Click OK and then click anywhere on the map to set a totem for your group.
          <br />
          <br />
          <span>(Optional)</span> Set a meetup time. The totem will expire 30 minutes after your set time.
          <div className={localStyles.center}>
            <input type='time' name='meetup-time' />
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions className={localStyles.center}>
        <Button
          basic
          size='huge'
          color='red'
          inverted
          onClick={() => {
            toggleTotemModal(false);
          }}>
          Cancel
        </Button>
        <Button
          color='blue'
          size='huge'
          inverted
          onClick={() => {
            let time = document.querySelector('input[name="meetup-time"]').value;
            if (time.length > 0) time = convertToDate(time);
            updateMeetupTime(time);
            placeTotemOnClick(true);
            toggleTotemModal(false);
          }}>
          OK
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

function convertToDate(time) {
  let expiresAt = new Date();
  const hours = Number(time.split(':')[0]);
  const minutes = Number(time.split(':')[1]);
  const setTime = hours + minutes / 60;
  const currentTime = expiresAt.getHours() + (expiresAt.getMinutes() / 60);

  if (currentTime > setTime) {
    expiresAt = new Date(expiresAt.getTime() + (24 * 3600 * 1000));
  }

  expiresAt.setHours(hours);
  expiresAt.setMinutes(minutes);

  return expiresAt.toUTCString();
}

export default connect((store) => {
  return {
    app: store.app,
  };
})(PlaceTotem);
