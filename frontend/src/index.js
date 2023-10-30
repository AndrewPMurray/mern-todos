import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';

import App from './App';
import * as sessionActions from './store/session';

import './index.css';
import { csrfFetch, restoreCSRF } from './store/csrf';

const root = ReactDOM.createRoot(document.getElementById('root'));

if (process.env.NODE_ENV !== 'production') {
	restoreCSRF();

	window.csrfFetch = csrfFetch;
	window.store = store;
	window.sessionActions = sessionActions;
} else if (window.location.protocol === 'http:') {
	window.location.href = window.location.href.replace('http:', 'https:');
}

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
