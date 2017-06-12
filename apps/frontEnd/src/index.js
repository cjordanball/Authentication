import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ActionTypes from './actions/types';

import reducers from './reducers';
import Header from './components/shared/header';
import HomePage from './components/home';
import SignInPage from './components/auth/signin';
import SignUpPage from './components/auth/signup';
import SignOutPage from './components/auth/signout';
import FeaturePage from './components/feature';
import RequireAuth from './components/higherOrderComponents/require_auth';
import '../style/style.less';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');
if (token) {
	store.dispatch({ type: ActionTypes.AUTH_USER });
}

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<div>
				<Header />
				<Switch>
					<Route path="/signin" component={SignInPage} />
					<Route path="/signup" component={SignUpPage} />
					<Route path="/feature" component={RequireAuth(FeaturePage)} />
					<Route path="/signout" component={SignOutPage} />
					<Route path="/" component={HomePage} />
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>, document.querySelector('.container'));
