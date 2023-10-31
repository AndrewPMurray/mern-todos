import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import session from './session';
import tasks from './tasks';

const reducer = combineReducers({
	session,
	tasks,
});

const store = configureStore({
	reducer,
});

export default store;
