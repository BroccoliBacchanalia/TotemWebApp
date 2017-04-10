const defaults = {
  agenda: [],
  uid: null,
  name: null,
  groupId: null,
  friendList: [],
  dataRetrieved: false,
  facebookUsername: null,
  facebookUID: null,
  position: {
    lat: 33.6823,
    lng: -116.2389165,
    timestamp: 'Needs to enable location'
  }
};

export default function userReducer(state = defaults, action) {
  switch(action.type) {
    case 'REMOVE_AGENDA': {
      return { ...state, agenda: action.payload.agenda };
    }
    case 'ADD_AGENDA': {
      return { ...state, agenda: action.payload.agenda };
    }
    case 'REMOVE_AGENDA_ITEM': {
      const newState = {
        agenda: [...state.agenda],
        uid: state.uid,
        name: state.name,
        groupId: state.groupId,
        friendList: [...state.friendList],
        dataRetrieved: state.dataRetrieved,
        facebookUsername: state.facebookUsername,
        facebookUID: state.facebookUID
      }
      const index = newState.agenda.indexOf(action.payload.key);
      newState.agenda.splice(index, 1);
      return newState;
    }
    case 'ADD_AGENDA_ITEM': {
      const newState = {
        agenda: [...state.agenda],
        uid: state.uid,
        name: state.name,
        groupId: state.groupId,
        friendList: [...state.friendList],
        dataRetrieved: state.dataRetrieved,
        facebookUsername: state.facebookUsername,
        facebookUID: state.facebookUID
      }
      newState.agenda.push(action.payload.key);
      return newState;
    }
    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        uid: action.payload.uid,
        name: action.payload.name,
        groupId: null
      };
    case 'DATA_RETRIEVED_FROM_FIREBASE': {
      return { ...state, dataRetrieved: true };
    }
    case 'UPDATE_USER_GROUP_ID': {
      return { ...state, groupId: action.payload.id };
    }
    case 'UPDATE_FRIENDS': {
      return { ...state, friendList: action.payload };
    }
    case 'UPDATE_GROUP_NAME': {
      return { ...state, groupName: action.payload.name }
    }
    case 'UPDATE_FB_USERNAME': {
      return { ...state, facebookUsername: action.payload.name }
    }
    case 'INITIAL_USER_DATA': {
      const newState = { ...state }
      if (action.userData.friends) {
        newState.friendList = action.userData.friends
      }
      if (action.userData.agenda) {
        newState.agenda = Object.keys(action.userData.agenda)
      }
      return newState;
    }
  }
  return state;
};
