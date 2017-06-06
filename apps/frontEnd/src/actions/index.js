import axios from 'axios';
import ActionTypes from './types';

const ROOT_URL = 'http://localhost:3142';

export const signInUser = ({ email, password }, history) => {
	console.log('inSignInUser', email, password);
	return (dispatch) => {
		// submit email/password to server
		axios.post(`${ROOT_URL}/signin`, { email, password })
		// if request good
			.then((res) => {
				// update state to indicate user is authed
				dispatch({ type: ActionTypes.SIGN_IN_USER });
				// save the JWT token
				localStorage.setItem('token', res.data.token);
				// redirect to the proper Route
				history.push('/feature');
			})
			// if request is bad
			.catch((error) => {
				// show error to user
				dispatch(authError('Bad Login Info'));
			});
	};
};

export const signOutUser = () => (
	{
		type: ActionTypes.SIGN_OUT_USER
	}
)

export const authError = error => (
	{
		type: ActionTypes.AUTH_ERROR,
		payload: error
	}
);
