import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthReducer from './reducer_auth';

const rootReducer = combineReducers({
	auth: AuthReducer,
	form: formReducer
});

export default rootReducer;
