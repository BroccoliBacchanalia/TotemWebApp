import React from 'react';
import store from '../redux/store.js';
import { connect } from 'redux';

export class CheckForInvites extends React.Component {
	render() {
		//if groups.pending invites does not have any pending invites route to choose venue
		//if groups.pending invites is true route to join group
		return(

		)
	}

}
////////IMPORTANTE!!!!!!!!!!!!!!///////////////
//will need to change routes for variable name from store when patrick gets db hooked up
export default connect((store) => {
	return {
  group: store.user
	}
})(user)