import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import requireAuth from './components/requireAuth';

//Send cookies to BE. URI should be redefined as graphql default endpoint drops when we define network interface
const networkInterface = createNetworkInterface({
	uri: '/graphql',
	opts: {
		credentials: 'same-origin',
	},
});

const client = new ApolloClient({
	dataIdFromObject: (o) => o.id,
	networkInterface,
});

const Root = () => {
	return (
		<ApolloProvider client={client}>
			<Router history={hashHistory}>
				<Route path="/" component={App}>
					<Route path="/login" component={LoginForm} />
					<Route path="/signup" component={SignupForm} />
					<Route path="/dashboard" component={requireAuth(Dashboard)} />
				</Route>
			</Router>
		</ApolloProvider>
	);
};

ReactDOM.render(<Root />, document.querySelector('#root'));
