const defaults = {
  name: null,
  users: {}
};

export default function navReducer(state = defaults, action) {
  switch(action.type) {
    case 'update_group_name': {
      return { ...state, name: action.payload.name };
    }
  }
  return state;
};
