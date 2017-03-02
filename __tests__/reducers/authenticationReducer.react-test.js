import defaults from '../../client/src/redux/reducers/authenticationReducer';

describe('Authentication Reducer', () => {

	it('has a default state', () => {
  
    expect(defaults).toEqual({
			isUserSignedIn: false,
			isInProgress: false,
			hasError: false,
			errorMessage: '',
			accessToken: null
    });

	})
})