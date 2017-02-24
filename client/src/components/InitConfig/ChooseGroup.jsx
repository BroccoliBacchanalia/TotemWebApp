import React from 'react';
import { connect } from 'redux';
import store from '../redux/store.js';
import { NavLink } from 'react-router-dom'
////Operating under the assumption that groupList is an array
export class ChooseGroup extends React.Component {
  render(){
  	return {
  		<div>
  		  <div>Choose Your Rabble</div>
  		  <ul>
  		    {this.props.groupList.map(item => {
  		    	<li>
  		    	{ item }
  		    	</li>
  		    })}
  		  </ul>
  		  <NavLink to="/map">Skip this step</NavLink>
  		</div>
  	}
  }
}

export default connect((store) => {
	return {
		//////////////Ask patrick about state name that he wants to use/////////////////
		groupList: user
	}
})
