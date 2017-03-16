import React, { Component } from 'react';
import localStyles from './GroupStyles.css';
import { defaults } from '../../redux/reducers/groupReducer'
import { connect } from 'react-redux';
import { Grid, Image, Button, Modal, Icon, Header } from 'semantic-ui-react';
import { firebaseRemove, updateUserGroupID, updateGroup} from '../../redux/actions';
import store from '../../redux/store'
import { Link } from 'react-router-dom'

class LeaveGroupModal extends Component {
  state = { open: false }
  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  render() {
    const { user } = this.props;
    const { open } = this.state;
    return (
      <Modal
        basic
        open={open}
        onOpen={this.open}
        onClose={this.close}
        className={localStyles.modal}
        closeIcon='close'
        trigger={
          <Button className={localStyles.removeButton} color='orange' attached='bottom' >
            Leave This Group
          </Button>
      }>
        <Header className='modal-header' icon='hand peace' content='Peace Out' />
        <Modal.Content>
          <p className='modal-body'>Are you sure you want to leave this group?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={this.close}
            size='huge'
            color='red'
            inverted >
            <Icon name='remove' /> No
          </Button>
          <Link to='/'>
            <Button
              onClick={() => {
                this.close();
                removeUserFromGroup(user);
              }}
              color='green'
              size='huge'
              inverted >
              <Icon name='checkmark' /> Yes
            </Button>
          </Link>
        </Modal.Actions>
      </Modal>
    )
  }
}

function removeUserFromGroup(user) {
  updateUserGroupID('');
  updateGroup(defaults);
  firebaseRemove(`groups/${user.groupId}/memberKeys/${user.uid}`);
  firebaseRemove(`users/${user.uid}/groupId`);
  if (Object.keys(store.getState().group.memberKeys).length === 0) {
    firebaseRemove(`groups/${user.groupId}`)
  }
}

export default connect((store) => {
  return {
    user: store.user
  };
})(LeaveGroupModal);
