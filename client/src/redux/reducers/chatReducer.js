const defaults = {
  defaultGroupName: ""
};

export default function chatReducer(state = defaults, action) {
  switch(action.type) {
    case 'DEAFULT_CHAT_GROUP': {
      return { ...state, defaultGroupName : action.payload.defaultGroupName };
    }
  }
  return state;
};
