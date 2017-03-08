import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Dimmer, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux';
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
          Click anywhere on the map to set a marker for your group.
          <br />
          <br />
          (Optional) Set a meetup time. The totem will expire 30 minutes after your set time.
          <div className={localStyles.center}>
            <input type='datetime-local' name='meetup-time' />
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
            const time = document.querySelector('input[name="meetup-time"]').value;
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

export default connect((store) => {
  return {
    app: store.app,
  };
})(PlaceTotem);
