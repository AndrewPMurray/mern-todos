import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createTask, deleteTask, getTasks, updateTask } from '../../store/tasks';

import { Error } from '../Error';
import { Todo } from '../Todo';

import './Todos.css';

export const Todos = ({ user }) => {
	const todos = useSelector((s) => s.tasks.myTasks);

	const [title, setTitle] = useState('');
	const [errors, setErrors] = useState({});
	const [editTitle, setEditTitle] = useState('');
	const [todoInEditing, setTodoInEditing] = useState({});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) return navigate('/login');
		dispatch(getTasks(user.username));
	}, [dispatch, navigate, user]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});
		dispatch(
			createTask({
				title,
				isComplete: false,
				user: user.id,
			})
		).then((data) => {
			if (data.payload?.errors) {
				setErrors(data.payload.errors);
			} else {
				setTitle('');
			}
		});
	};

	const handleComplete = (task) => {
		const isComplete = task.isComplete;
		dispatch(
			updateTask({
				...task,
				isComplete: !isComplete,
			})
		);
	};

	const handleUpdate = (task) => {
		dispatch(updateTask({ ...task, title: editTitle })).then((data) => {
			if (data.payload?.errors) {
				const inputEl = document.querySelector('.todo-item-input');
				if (!inputEl.classList.contains('flash')) {
					inputEl.classList.add('flash');
				}
			} else {
				setTodoInEditing({});
			}
		});
	};

	const handleDelete = (taskId) => {
		dispatch(deleteTask(taskId));
	};

	if (!user) return null;

	return (
		<div className='todos-container'>
			<div className='todo-list'>
				<h1 className='todo-list-header'>My ToDos</h1>
				{todos.map((todo) => (
					<Todo
						key={todo._id}
						todo={todo}
						editTitle={editTitle}
						setEditTitle={setEditTitle}
						todoInEditing={todoInEditing}
						setTodoInEditing={setTodoInEditing}
						handleComplete={handleComplete}
						handleUpdate={handleUpdate}
						handleDelete={handleDelete}
					/>
				))}
			</div>
			<div className='todo-create-container'>
				<div className='new-todo-input-container'>
					<input
						name='title'
						value={title}
						placeholder='Create a new ToDo (title required)'
						onChange={(e) => setTitle(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								handleSubmit(e);
							}
						}}
					/>
					{errors.title && <Error text={errors.title} />}
				</div>
				<button className='create-todo-button' onClick={handleSubmit}>
					Create ToDo
				</button>
			</div>
		</div>
	);
};
