import React from 'react';
import { connect } from 'react-redux';
import store from '../../redux/store.js';
import { Link } from 'react-router-dom';
import { selectGroup, skipGroup } from '../../redux/actions/venueActions.js'
import { updateGroupId } from '../../redux/actions/userActions';

////Operating under the assumption that groupList is an array
class ChooseGroup extends React.Component {
  constructor(props, context) {
    super(props);
  }

  render(){
    const groupKeys = Object.keys(this.props.groupList);
    const router = this.context.router;

  	return (
  		<div>
  		  <div>Choose Your Group</div>
        <ul>
          {groupKeys.map((key, index) => (
            <li key={index} onClick={() => {
              updateGroupId.call(this, key);
              router.push('/map');
            }}>
              {this.props.groupList[key] }
            </li>
          ))}
        </ul>
        <Link to="/choosevenue">
          <div>Skip this step</div>
        </Link>
  		</div>
  	);
  }
}

ChooseGroup.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect((store) => {
	return {
		groupList: store.user.pendingInvites
	}
})(ChooseGroup)
