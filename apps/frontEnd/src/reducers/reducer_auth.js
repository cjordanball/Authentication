import ActionTypes from '../actions/types';

const INITIAL_STATE = {
	authenticated: false,
	error: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
	case ActionTypes.SIGN_IN_USER:
		console.log('signed in!');
		return { ...state, authenticated: true };
	case ActionTypes.SIGN_OUT_USER:
		console.log('signed out!');
		return { ...state, authenticated: false };
	case ActionTypes.UNAUTH_USER:
		return { ...state, authenticated: false };
	case ActionTypes.AUTH_ERROR:
		return { ...state, error: action.payload };
	default:
		return state;
	}
};
