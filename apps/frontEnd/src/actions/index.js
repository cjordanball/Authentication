import axios from 'axios';
import ActionTypes from './types';

const ROOT_URL = 'http://localhost:3142';

export const signInUser = ({ email, password }, history) => {
	console.log('inSignInUser', email, password);
	return (dispatch) => {
		// submit email/password to server
		axios.post(`${ROOT_URL}/signin`, { email, password })
		// if request good
			.then((user) => {
				console.log('SUCCESS');
				// update state to indicate user is authed
				dispatch({ type: ActionTypes.SIGN_IN_USER });
				// save the JWT token
				// redirect to the proper Route
				history.push('/feature');
				console.log('success: ', user);
			})
			// if request is bad
			.catch((error) => {
				console.log('ERROR', error);
				// show error to user
			});
	};
};
