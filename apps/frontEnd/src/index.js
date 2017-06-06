import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import reducers from './reducers';
import Header from './components/shared/header';
import HomePage from './components/home';
import SignInPage from './components/auth/signin';
import SignUpPage from './components/signup';
import '../style/style.less';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<BrowserRouter>
			<div>
				<Header />
				<Switch>
					<Route path="/signin" component={SignInPage} />
					<Route path="/signup" component={SignUpPage} />
					<Route path="/" component={HomePage} />
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>, document.querySelector('.container'));
