import React from 'react';
import store from '../../redux/store.js';
import { connect } from 'react-redux';
import ChooseGroup from './ChooseGroup.jsx';
import ChooseVenue from './ChooseVenue.jsx';

export class CheckForInvites extends React.Component {
	render() {
		//if groups.pending invites does not have any pending invites route to choose venue
		///////Talk to patrick about what he wants defaults to be!////////////
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
////////IMPORTANTE!!!!!!!!!!!!!!///////////////
//will need to change routes for variable name from store when patrick gets db hooked up
export default connect((store) => {
	return {
  group: store.config.group
	}
})(CheckForInvites)