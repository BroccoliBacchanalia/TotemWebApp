import React from 'react';
import { connect } from 'react-redux';
import store from '../../redux/store.js';
import { NavLink } from 'react-router-dom';
import { selectGroup } from '../../redux/actions/configActions.js'
////Operating under the assumption that groupList is an array
export class ChooseGroup extends React.Component {
  render(){
    var keys = Object.keys(this.props.groupList)
  	return (
  		<div>
  		  <div>Choose Your Group</div>
        <ul>
          {keys.map((item, key) =>{
            return(
            <li key={key} onClick={selectGroup.bind(this, this.props.groupList[item])}>
              { this.props.groupList[item] }
            </li>
            )
          })}
        </ul>
  		</div>
  	)
  }
}

export default connect((store) => {
	return {
		//////////////Ask patrick about state name that he wants to use/////////////////
		groupList: store.config.group.pendingInvites
	}
})(ChooseGroup)


                //<NavLink to="/map">Skip this step</NavLink>