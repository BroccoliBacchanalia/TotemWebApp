const defaults = {
  isUserSignedIn: false,
  isInProgress: false,
  hasError: false,
  errorMessage: '',
  uid: 0
};

export default function auth(state = defaults, action) {
  switch(action.type) {
    case 'SIGNIN_SUCCESS':
      const { uid } = action;
      return {
        ...state,
        isUserSignedIn: true,
        isInProgress: false,
        uid: uid
      };
    case 'SIGNIN':
      return {
        ...state,
        isInProgress: true
      };
    case 'SIGNIN_ERROR':
      const { errorMessage } = action;
      return {
        ...state,
        hasError: true,
        errorMessage: errorMessage
      };
    default:
      return state;
  }
}