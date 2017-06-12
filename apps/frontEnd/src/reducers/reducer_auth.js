import ActionTypes from '../actions/types';

const INITIAL_STATE = {
	authenticated: false,
	error: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
	case ActionTypes.SIGN_IN_USER:
		return { ...state, error: '', authenticated: true };
	case ActionTypes.SIGN_OUT_USER:
		return { ...state, error: '', authenticated: false };
	case ActionTypes.SIGN_UP_USER:
		return { ...state, error: '', authenticated: true };
	case ActionTypes.AUTH_USER:
		return { ...state, error: '', authenticated: true };
	case ActionTypes.UNAUTH_USER:
		return { ...state, authenticated: false };
	case ActionTypes.AUTH_ERROR:
		return { ...state, error: action.payload };
	case ActionTypes.FETCH_MESSAGE:
		return { ...state, message: action.payload.message };
	default:
		return state;
	}
};
