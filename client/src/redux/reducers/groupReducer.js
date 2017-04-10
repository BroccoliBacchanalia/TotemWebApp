export const defaults = {
  groupName: '',
  memberKeys: {},
  members: {},
  venueId: '',
  totem: {
    coords: {},
    name: 'Totem Meetup Spot',
    meetupTime: null
  },
  showTotemInfo: false,
  placeTotem: false,
};

export default function groupReducer(state = defaults, action) {
  switch(action.type) {
    case 'UPDATING_GROUP_MEMBER': {
      const user = action.payload.user;
      const uid = action.payload.uid;
      const newState = {
        groupName: state.groupName,
        memberKeys: { ...state.memberKeys },
        members: { ...state.members },
        venueId: state.venueId,
        totem: { ...state.totem },
        showTotemInfo: state.showTotemInfo,
        placeTotem: state.placeTotem
      };
      newState.members[uid] = user;
      return newState;
    }
    case 'USERS_SORT': {
      const members = objToArray(state.members);
      const sortedUsers = members.sort(action.payload.method);
      return {...state, members: arrToObj(sortedUsers)};
    }
    case 'UPDATE_KEYS': {
      return { ...state, memberKeys: action.payload.keys };
    }
    case 'SHOW_NAME': {
      const uid = action.payload;
      const newState = {
        groupName: state.groupName,
        memberKeys: { ...state.memberKeys },
        members: { ...state.members },
        venueId: state.venueId,
        totem: { ...state.totem },
        showTotemInfo: state.showTotemInfo,
        placeTotem: state.placeTotem
      };
      newState.members[uid].showInfo = !newState.members[uid].showInfo;
      return newState;
    }
    case 'UPDATE_GROUP': {
      return { ...state, ...action.payload.group }
    }
    case 'UPDATE_GROUP_NAME': {
      return { ...state, groupName: action.payload.name }
    }
    case 'UPDATE_VENUE_ID': {
      return { ...state, venueId: action.payload.id };
    }
    case 'UPDATE_TOTEM_COORDS': {
      const newState = {
        groupName: state.groupName,
        memberKeys: { ...state.memberKeys },
        members: { ...state.members },
        venueId: state.venueId,
        totem: { ...state.totem },
        showTotemInfo: state.showTotemInfo,
        placeTotem: state.placeTotem
      };
      newState.totem.coords = action.payload.coords;
      return newState;
    }
    case 'UPDATE_MEETUP_TIME': {
      const newState = {
        groupName: state.groupName,
        memberKeys: { ...state.memberKeys },
        members: { ...state.members },
        venueId: state.venueId,
        totem: { ...state.totem },
        showTotemInfo: state.showTotemInfo,
        placeTotem: state.placeTotem
      };
      newState.totem.meetupTime = action.payload.time;
      return newState;
    }
    case 'TOGGLE_TOTEM_INFO': {
      return { ...state, showTotemInfo: !state.showTotemInfo };
    }
    case 'PLACE_TOTEM': {
      return { ...state, placeTotem: action.payload };
    }
    case 'CLOSE_INFO_WINDOWS': {
      const newState = {
        groupName: state.groupName,
        memberKeys: { ...state.memberKeys },
        members: { ...state.members },
        venueId: state.venueId,
        totem: { ...state.totem },
        showTotemInfo: false,
        placeTotem: state.placeTotem
      };

      for (let key in newState.members) {
        newState.members[key].showInfo = false;
      }

      return newState;
    }
  }
  return state;
};

function objToArray(obj) {
  const result = [];
  for (let key in obj) {
    const newObj = { ...obj[key], key: key };
    result.push(newObj);
  }
  return result;
}

function arrToObj(arr) {
  const result = {};
  for (let item of arr) {
    result[item.key] = item;
  }
  return result;
}
