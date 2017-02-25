import React from 'react';
//import { controller } from 'react-redux';
//import store from '../../redux/store.js';
import mockUserData from '../../redux/reducers/mock_user_data.js';
import  { skipCreateGroup } from '../../redux/actions/configActions.js';

export class CreateGroup extends React.Component {

  render() {
  	var userKeys = Object.keys(mockUserData);
  	return (
      <div>
       CreateGroup
        <ul>
      {userKeys.map((item, key) => {
      	return (
          <li key={key}>
            <div>
              {mockUserData[item].label}
            </div>
          </li>
      	)
      })}
        </ul>
        <div onClick={skipCreateGroup}>Skip this step</div>
      </div>
  	)
  }
}

// export default connect((store) => {
// 	return {
//     friends: 
// 	}
// })(CreateGroup)