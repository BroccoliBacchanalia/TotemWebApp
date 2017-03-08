import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Dimmer, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { toggleTotemModal } from '../../redux/actions/appActions';

class PlaceTotem extends Component {

  render() {
    const { app, venue } = this.props

    return (
      <Modal open={app.totemModal} basic size='fullscreen'>
        <Header className='modal-header' content='Place a Totem' />
        <img src='img/loading.gif' />
        <Modal.Content>
          <p className='modal-body'>Are you sure you want to place a totem at this location?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            basic
            size='huge'
            color='red'
            inverted
            onClick={() => {
              toggleTotemModal(false);
            }}>
            <Icon name='remove' />
            No
          </Button>
          <Button
            color='green'
            size='huge'
            inverted
            onClick={() => {
              toggleTotemModal(false);
            }}>
            <Icon name='checkmark' />
            Yes
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
})(PlaceTotem);
