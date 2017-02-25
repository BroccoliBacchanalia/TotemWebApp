import React from 'react';
import { connect } from 'react-redux';
import store from '../../redux/store.js';
import  { skipCreateGroup } from '../../redux/actions/venueActions.js';

export class CreateGroup extends React.Component {

  render() {
  	console.log('CREATE GROUP', this.props.friends);
  	return (
      <div>
        <div onClick={skipCreateGroup}>Skip this step</div>
      </div>
  	)
  }
}

export default connect((store) => {
	return {
    friends: store.user.friendList
	}
})(CreateGroup)
