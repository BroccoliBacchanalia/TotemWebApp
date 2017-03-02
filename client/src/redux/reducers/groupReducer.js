const defaults = {
  name: null,
  memberKeys: {},
  users: {},
};

export default function groupReducer(state = defaults, action) {
  switch(action.type) {
    case 'UPDATING_USER_LOC': {
      const user = action.payload.user;
      const uid = action.payload.uid;
      const newState = {
        name: state.name,
        memberKeys: { ...state.memberKeys },
        users: { ...state.users }
      };
      newState.users[uid] = user;
      return newState;
    }
    case 'USERS_SORT': {
      const users = objToArray(state.users);
      const sortedUsers = users.sort(action.payload.method);
      return {...state, users: arrToObj(sortedUsers)};
    }
    case 'UPDATE_KEYS': {
      return { ...state, memberKeys: action.payload.keys };
    }
    case 'SHOW_NAME': {
      const uid = action.payload;
      const newState = {
        name: state.name,
        memberKeys: { ...state.memberKeys },
        users: { ...state.users }
      };
      newState.users[uid].showInfo ? newState.users[uid].showInfo = !newState.users[uid].showInfo : newState.users[uid].showInfo = true;
      return newState;
    }
    case 'UPDATE_GROUP_NAME': {
      return { ...state, groupName: action.payload.name }
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
