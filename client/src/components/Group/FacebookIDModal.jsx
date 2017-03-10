import React, { Component } from 'react';
import localStyles from './GroupStyles.css';
import { defaults } from '../../redux/reducers/groupReducer'
import { connect } from 'react-redux';
import { Grid, Image, Button, Modal, Icon, Header, Input } from 'semantic-ui-react';
import { firebaseSet, updateFacebookUsername } from '../../redux/actions';
import { Link } from 'react-router-dom'

class FacebookIDModal extends Component {
  state = { open: false }
  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  render() {
    const { user } = this.props;
    const { open } = this.state;
    return (
      <Modal 
        open={open}
        onOpen={this.open}
        onClose={this.close}
        className={localStyles.modal} 
        closeIcon='close'
        trigger={
          <Button
            basic
            className={localStyles.button}
            icon='comment outline'
            size='large'/>
        }
      >
        <Header className='modal-header' icon='facebook square' content='Messenger' />
        <Modal.Content>
          <p className={localStyles.fContent}>Enter your facebook username to integrate with messenger</p>
        </Modal.Content>
        <Modal.Actions className={localStyles.fActions}>
          <p className={localStyles.fContent}>http://facebook.com/</p>
          <Input 
            className={localStyles.fContent} 
            className={localStyles.fInput} 
            placeholder={user.facebookUsername ? user.facebookUsername : 'username'}
            onChange={(e) => {
              updateFacebookUsername(e.target.value)
            }}
          />
          <br />
        </Modal.Actions>
        <Modal.Content className={localStyles.fButton}>
          <br /><br /><br />
          <Button 
            onClick={() => {
              this.close();
              submitFacebookUsername(user);
            }}
            color='facebook'
            size='huge' >
            <Icon name='facebook f'/> Submit
          </Button>
        </Modal.Content>
      </Modal>
    )
  }
}

function submitFacebookUsername(user) {
  firebaseSet(`users/${user.uid}/facebookUsername/`, user.facebookUsername)
}

export default connect((store) => {
  return {
    user: store.user
  };
})(FacebookIDModal);