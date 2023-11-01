import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';

export const getTasks = createAsyncThunk(
	'tasks/getTasks',
	async (username, { rejectWithValue }) => {
		try {
			const response = await csrfFetch(`/api/tasks/${username}`);
			const data = await response.json();
			return { tasks: data.tasks, username: username };
		} catch (e) {
			const errors = await e.json();
			return rejectWithValue(errors);
		}
	}
);

export const searchTasks = createAsyncThunk(
	'tasks/searchTasks',
	async (username, { rejectWithValue }) => {
		try {
			const response = await csrfFetch(`/api/tasks/${username}`);
			const data = await response.json();
			return { tasks: data.tasks, username: username };
		} catch (e) {
			const errors = await e.json();
			return rejectWithValue(errors);
		}
	}
);

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

const initialState = { searchUsername: null, myTasks: [], searchTasks: [] };

const sessionSlice = createSlice({
	name: 'session',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getTasks.fulfilled, (state, action) => {
				const newState = { ...state, myTasks: action.payload.tasks };
				return newState;
			})
			.addCase(searchTasks.fulfilled, (state, action) => {
				const newState = {
					...state,
					searchTasks: action.payload.tasks,
					searchUsername: action.payload.username,
				};
				return newState;
			})
			.addCase(searchTasks.rejected, (state) => {
				const newState = { ...state, searchTasks: [], searchUsername: null };
				return newState;
			})
			.addCase(createTask.fulfilled, (state, action) => {
				state.myTasks.push(action.payload);
			})
			.addCase(updateTask.fulfilled, (state, action) => {
				const myTasks = [...state.myTasks];
				const index = myTasks.findIndex((task) => task._id === action.payload._id);

				myTasks[index] = action.payload;

				state.myTasks = myTasks;
			})
			.addCase(deleteTask.fulfilled, (state, action) => {
				const myTasks = [...state.myTasks];
				const index = myTasks.findIndex((task) => task._id === action.payload._id);

				myTasks.splice(index, 1);

				state.myTasks = myTasks;
			})
			.addCase(clearState.fulfilled, () => {
				const newState = { searchUsername: null, myTasks: [], searchTasks: [] };
				return newState;
			});
	},
});

export default sessionSlice.reducer;
