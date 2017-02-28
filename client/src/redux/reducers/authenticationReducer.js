const defaults = {
  isUserSignedIn: false,
  isInProgress: false,
  hasError: false,
  errorMessage: '',
  accessToken: null
};

export default function auth(state = defaults, action) {
  switch(action.type) {
    case 'SIGNIN_SUCCESS':
      const { uid } = action.payload.uid;
      return {
        ...state,
        isInProgress: false,
        accessToken: action.payload.token
      };
    case 'SIGNIN':
      return {
        ...state,
        isUserSignedIn: true,
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
