import axios from 'axios';
import ActionTypes from './types';

const ROOT_URL = 'http://localhost:3142';

export const authError = error => (
	{
		type: ActionTypes.AUTH_ERROR,
		payload: error
	}
);

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
			.catch(({ response }) => {
				console.log('caught', response);
				// show error to user
				dispatch({
					type: ActionTypes.AUTH_ERROR,
					payload: response.data
				});
			});
	};
};

export const signUpUser = ({ email, password }, history) => {
	console.log('inSignUpUser', email, password);
	return (dispatch) => {
		axios.post(`${ROOT_URL}/signup`, { email, password })
		.then((res) => {
			dispatch({ type: ActionTypes.SIGN_UP_USER });
			localStorage.setItem('token', res.data.token);
			history.push('/feature');
		})
		.catch(({ response }) => {
			console.log('caughtsu', response);
			dispatch({
				type: ActionTypes.AUTH_ERROR,
				payload: response.data.error
			});
		});
	};
};

export const signOutUser = () => {
	localStorage.removeItem('token');
	return ({
		type: ActionTypes.SIGN_OUT_USER
	});
};

export const fetchMessage = () => {
	return (dispatch) => {
		axios.get(ROOT_URL, {
			headers: { authorization: localStorage.getItem('token') }
		})
		.then((res) => {
			dispatch({
				type: ActionTypes.FETCH_MESSAGE,
				payload: res.data
			});
		});
	};
};
