import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';

export const login = createAsyncThunk('session/setUser', async (user) => {
	const { credential, password } = user;
	const response = await csrfFetch('/api/session', {
		method: 'POST',
		body: JSON.stringify({
			credential,
			password,
		}),
	});
	const data = await response.json();
	return data.user;
});

export const restoreUser = createAsyncThunk('session/restoreUser', async () => {
	const response = await csrfFetch('/api/session');
	const data = await response.json();
	return data.user;
});

export const signup = createAsyncThunk('session/signUpUser', async (user) => {
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
	return data;
});

export const logout = createAsyncThunk('session/logout', async () => {
	const response = await csrfFetch('/api/session', {
		method: 'DELETE',
	});
	const data = await response.json();
	return data;
});

const initialState = { user: null };

const sessionSlice = createSlice({
	name: 'session',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload || null;
			})
			.addCase(restoreUser.fulfilled, (state, action) => {
				state.user = action.payload || null;
			})
			.addCase(signup.fulfilled, (state, action) => {
				state.user = action.payload || null;
			})
			.addCase(logout.fulfilled, (state, _action) => {
				state.user = null;
			});
	},
});

export default sessionSlice.reducer;
