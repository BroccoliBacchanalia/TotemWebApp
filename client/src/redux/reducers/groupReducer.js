import firebase from 'firebase';

const defaults = {
  name: null,
  memberKeys: {},
  users: {}
};

export default function groupReducer(state = defaults, action) {
  switch(action.type) {
    case 'updating_user_loc': {
      return {...state, users: action.payload.users};
    }
    case 'update_group_name': {
      return { ...state, name: action.payload.name };
    }
    case 'users_sort': {
      const users = objToArray(state.users);
      const sortedUsers = users.sort(action.payload.method);
      return {...state, users: arrToObj(sortedUsers)};
    }
    case 'update_keys': {
      return { ...state, memberKeys: action.payload.keys };
    }
    case 'show_name': {
      const uid = action.payload.uid
      console.log('users',state.users.uid)
      console.log('uid',uid)
      // return {...state.users.uid, showInfo: action.payload.showInfo}
      return state;
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
