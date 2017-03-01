import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Dimmer, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { toggleEmergencyFriends } from '../../redux/actions'

class ContactFriends extends Component {

  render() {
    const { app } = this.props

    return (
      <Modal open={app.friendsModal} basic size='fullscreen'>
        <Header className='modal-header' icon='child' content='Need some help?' />
        <Modal.Content>
          <p className='modal-body'>Are you sure you want to send an emergency signal to your group?</p>
        </Modal.Content>
        <Modal.Actions float='center'>
          <Button basic size='huge' color='red' inverted onClick={toggleEmergencyFriends}>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' size='huge' inverted onClick={toggleEmergencyFriends}>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default connect((store) => {
  return {
    app: store.app
  };
})(ContactFriends);