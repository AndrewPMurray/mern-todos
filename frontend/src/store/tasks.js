import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';

export const getTasks = createAsyncThunk(
	'tasks/getTasks',
	async (userName, { rejectWithValue }) => {
		try {
			const response = await csrfFetch(`/api/tasks/${userName}`);
			const data = await response.json();
			return data.tasks;
		} catch (e) {
			const errors = await e.json();
			return rejectWithValue(errors);
		}
	}
);

export const searchTasks = createAsyncThunk(
	'tasks/searchTasks',
	async (userName, { rejectWithValue }) => {
		try {
			const response = await csrfFetch(`/api/tasks/${userName}`);
			const data = await response.json();
			return data.tasks;
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

const initialState = { myTasks: [], searchTasks: [] };

const sessionSlice = createSlice({
	name: 'session',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getTasks.fulfilled, (state, action) => {
				const newState = { ...state, myTasks: action.payload };
				return newState;
			})
			.addCase(searchTasks.fulfilled, (state, action) => {
				const newState = { ...state, searchTasks: action.payload };
				return newState;
			})
			.addCase(searchTasks.rejected, (state) => {
				const newState = { ...state, searchTasks: [] };
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
				const newState = { myTasks: [], searchTasks: [] };
				return newState;
			});
	},
});

export default sessionSlice.reducer;
