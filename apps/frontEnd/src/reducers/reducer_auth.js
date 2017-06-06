import ActionTypes from '../actions/types';

const INITIAL_STATE = {
	authenticated: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
	case ActionTypes.SIGN_IN_USER:
		console.log('signed in!');
		return { ...state, authenticated: true };
	case ActionTypes.SIGN_OUT_USER:
		return { ...state, authenticated: false };
	default:
		return state;
	}
};
