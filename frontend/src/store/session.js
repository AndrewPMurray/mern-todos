import { createSlice } from '@reduxjs/toolkit';

import { csrfFetch } from './csrf';
// Slice
const slice = createSlice({
	name: 'session',
	initialState: {
		session: {
			user: null,
		},
	},
	reducers: {
		loginSuccess: (state, action) => {
			state.session.user = action.payload;
		},
		logoutSuccess: (state, action) => {
			state.session.user = null;
		},
	},
});

// Actions
const { loginSuccess, logoutSuccess } = slice.actions;

export const login = (user) => async (dispatch) => {
	const { credential, password } = user;
	const response = await csrfFetch('/api/session', {
		method: 'POST',
		body: JSON.stringify({
			credential,
			password,
		}),
	});
	const data = await response.json();
	dispatch(loginSuccess(data.user));
	return response;
};

export const restoreUser = () => async (dispatch) => {
	const response = await csrfFetch('/api/session');
	const data = await response.json();
	dispatch(loginSuccess(data.user));
	return response;
};

export const signup = (user) => async (dispatch) => {
	const { username, email, password, confirmPassword } = user;
	const response = await csrfFetch('/api/users', {
		method: 'POST',
		body: JSON.stringify({
			username,
			email,
			password,
			confirmPassword,
		}),
	});
	const data = await response.json();
	dispatch(loginSuccess(data.user));
	return response;
};

export const logout = () => async (dispatch) => {
	const response = await csrfFetch('/api/session', {
		method: 'DELETE',
	});
	dispatch(logoutSuccess());
	return response;
};

export default slice.reducer;
