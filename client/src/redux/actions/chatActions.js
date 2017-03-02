import store from '../../redux/store';
import firebase from 'firebase';

export function setDefaultChat(key) {
	// console.log("0-------------------------------------------------------------------------")
  let defaultGroupName = key
  console.log("here is the group key: ", key)//getGroupName(key)
  store.dispatch({
    type: 'DEAFULT_CHAT_GROUP',
     payload: { defaultGroupName }
  });
}

function getGroupName(key) {


}