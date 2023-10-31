import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';

export const getTasks = createAsyncThunk('tasks/getTasks', async (userId, { rejectWithValue }) => {
	try {
		const response = await csrfFetch(`/api/tasks/${userId}`);
		const data = await response.json();
		return data.tasks;
	} catch (e) {
		const errors = await e.json();
		return rejectWithValue(errors);
	}
});

export const createTask = createAsyncThunk(
	'tasks/createTask',
	async (task, { rejectWithValue }) => {
		try {
			const response = await csrfFetch('/api/tasks', {
				method: 'POST',
				body: JSON.stringify(task),
			});
			const data = await response.json();
			return data.newTask;
		} catch (e) {
			const errors = await e.json();
			return rejectWithValue(errors);
		}
	}
);

export const updateTask = createAsyncThunk(
	'tasks/updateTask',
	async (task, { rejectWithValue }) => {
		try {
			const response = await csrfFetch('/api/tasks', {
				method: 'PUT',
				body: JSON.stringify(task),
			});
			const data = await response.json();
			return data.updatedTask;
		} catch (e) {
			const errors = await e.json();
			return rejectWithValue(errors);
		}
	}
);

export const deleteTask = createAsyncThunk(
	'tasks/deleteTask',
	async (taskId, { rejectWithValue }) => {
		try {
			const response = await csrfFetch('/api/tasks', {
				method: 'DELETE',
				body: JSON.stringify({ id: taskId }),
			});
			const data = await response.json();
			return data.deletedTask;
		} catch (e) {
			const errors = await e.json();
			return rejectWithValue(errors);
		}
	}
);

export const clearState = createAsyncThunk('tasks/clearTasks', async () => {
	return { response: 'user data cleared' };
});

const initialState = [];

const sessionSlice = createSlice({
	name: 'session',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getTasks.fulfilled, (_state, action) => {
				const newState = action.payload;
				return newState;
			})
			.addCase(createTask.fulfilled, (state, action) => {
				state.push(action.payload);
			})
			.addCase(updateTask.fulfilled, (state, action) => {
				const index = state.findIndex((task) => task._id === action.payload._id);
				const newState = [...state];

				newState[index] = action.payload;

				return newState;
			})
			.addCase(deleteTask.fulfilled, (state, action) => {
				const newState = [...state];
				const index = newState.findIndex((task) => task._id === action.payload._id);

				newState.splice(index, 1);

				return newState;
			})
			.addCase(clearState.fulfilled, () => {
				const newState = [];
				return newState;
			});
	},
});

export default sessionSlice.reducer;
