const defaults = {
  isUserSignedIn: false,
  isInProgress: false,
  hasError: false,
  errorMessage: '',
  uid: null,
  accessToken: null
};

export default function auth(state = defaults, action) {
  switch(action.type) {
    case 'SIGNIN_SUCCESS':
      const { uid } = action.payload.uid;
      return {
        ...state,
        isUserSignedIn: true,
        isInProgress: false,
        uid: uid,
        accessToken: action.payload.token
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
