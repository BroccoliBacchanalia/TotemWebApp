import React from 'react';
import { connect } from 'redux';
import store from '../redux/store.js';
import { selectGroup } from '../actions/configActions.js';

export class ChooseVenue extends React.Component {
  render(){
  	return (
    <div>
      <ul>
  	    {this.props.venues.map((item) => {
  	    	<li>
  	    	<div>{item.name}</div>
  	    	{item.address.line1}
  	    	</li>
  	    })}
  	  </ul>
    </div>  
  	)
  }
}

export default connect((store) => {
	return {
		venues: store.config.defaults.venues
	}
})(ChooseVenue)