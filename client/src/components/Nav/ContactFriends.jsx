import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Dimmer, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { toggleEmergencyFriends } from '../../redux/actions'

class ContactFriends extends Component {

  render() {
    const { app, venue } = this.props
    
    return (
      <Modal open={app.friendsModal} basic size='fullscreen'>
        <Header className='modal-header' icon='child' content='Need some help?' />
        <Modal.Content>
          <p className='modal-body'>Are you sure you want to send distress signal to your group?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button 
            size='huge' 
            color='red' 
            inverted 
            onClick={toggleEmergencyFriends}>
            <Icon name='remove' /> No
          </Button>
          <Button 
            color='green' 
            size='huge' 
            inverted 
            onClick={toggleEmergencyFriends}>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default connect((store) => {
  return {
    app: store.app,
  };
})(ContactFriends);
