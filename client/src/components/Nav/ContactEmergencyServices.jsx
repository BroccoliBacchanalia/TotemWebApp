import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Dimmer, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { toggleEmergencyServices } from '../../redux/actions'

class ContactEmergencyServices extends Component {

  render() {
    const { app } = this.props

    return (
      <Modal open={app.emergencyModal} basic size='fullscreen'>
        <Header className='modal-header' icon='emergency' content='Emergency Services?' />
        <Modal.Content>
          <p className='modal-body'>Are you sure you want to send a distress signal to contact emergency services?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic size='huge' color='red' inverted onClick={toggleEmergencyServices}>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' size='huge' inverted onClick={toggleEmergencyServices}>
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
})(ContactEmergencyServices);