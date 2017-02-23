const defaults = [
  { id: 1, name: 'smirti' },
  { id: 2, name: 'pat' },
  { id: 3, name: 'john' },
  { id: 4, name: 'derek' }
];

export default function userReducer(state = defaults, action) {
  switch(action.type) {
    case 'create_user': {
      return [ ...state, { id: action.payload.id, name: action.payload.name} ];
    }
    case 'delete_user': {
      //TODO
      return state;
    }
  }
  return state;
};
