export function tempReducer(state={}, action) {
  switch(action.type) {
    case "SOME_CASE": {
      return {...state, property: value}
    }
    case "SOME_OTHER_CASE": {
      return {...state, property: value}
    }
    default:
      return state;
  }
}
