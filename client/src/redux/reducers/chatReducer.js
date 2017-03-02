const defaults = {
  defaultGroupName: "",
  defaultGroupKey: ""
};

export default function chatReducer(state = defaults, action) {
  switch(action.type) {
    case 'DEAFULT_CHAT_GROUP': {
      return { ...state, 
      	defaultGroupName : action.payload.defaultGroupName,
      	defaultGroupKey : action.payload.defaultGroupKey,
      };
    }
  }
  return state;
};
