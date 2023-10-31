import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import session from './session';

const reducer = combineReducers({
	session,
});

const store = configureStore({
	reducer,
});

export default store;
