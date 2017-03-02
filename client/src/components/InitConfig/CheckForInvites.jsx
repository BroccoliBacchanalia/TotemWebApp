import React from 'react';
import store from '../../redux/store.js';
import { connect } from 'react-redux';
import ChooseGroup from './ChooseGroup.jsx';
import ChooseVenue from './ChooseVenue.jsx';
import store from '../../redux/store';

class CheckForInvites extends React.Component {
	render() {
		//if groups.pending invites does not have any pending invites route to choose venue
		if(this.props.group.pendingInvites === "") {
			return (
        <ChooseVenue />
			)
		}
		//if groups.pending invites is true route to join group
		if(this.props.group.pendingInvites !== '') {
		  return(
        <ChooseGroup />
		  )
	  }
  }
}
export default connect((store) => {
	return {
  group: store.config.group
	}
})(CheckForInvites)
