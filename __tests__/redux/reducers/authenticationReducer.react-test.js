import auth from '../../../client/src/redux/reducers/authenticationReducer';


describe('Authentication Reducer', () => {
	it('is expect to have a default state', () => { 
    expect(auth(undefined, {}))
    .toEqual({
			isUserSignedIn: false,
			isInProgress: false,
			hasError: false,
			errorMessage: '',
			accessToken: null
    });
	})

})