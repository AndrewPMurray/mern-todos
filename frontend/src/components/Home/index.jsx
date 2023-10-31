import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createTask, deleteTask, getTasks, updateTask } from '../../store/tasks';

import { Error } from '../Error';

import './Home.css';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
	const user = useSelector((s) => s.session.user);
	const tasks = useSelector((s) => s.tasks);

	const [title, setTitle] = useState('');
	const [errors, setErrors] = useState({});
	const [editTitle, setEditTitle] = useState('');
	const [editErrors, setEditErrors] = useState({});
	const [taskInEditing, setTaskInEditing] = useState({});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) return navigate('/login');
		dispatch(getTasks(user.id));
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
			setEditErrors({});
			if (data.payload?.errors) {
				setEditErrors(data.payload.errors);
			} else {
				setTaskInEditing({});
			}
		});
	};

	const handleDelete = (taskId) => {
		dispatch(deleteTask(taskId));
	};

	return (
		<div className='tasks-container'>
			<div className='task-create-container'>
				<h3 style={{ margin: 0 }}>Create a new Task:</h3>
				<div className='input-container'>
					<input
						name='title'
						value={title}
						placeholder='title for task (required)'
						onChange={(e) => setTitle(e.target.value)}
					/>
					{errors.title && <Error text={errors.title} />}
				</div>
				<button onClick={handleSubmit}>Create Task</button>
			</div>
			<div className='task-list'>
				{tasks.map((task) => (
					<div className='task' key={task._id}>
						<input
							type='checkbox'
							name='isComplete'
							value={task.isComplete}
							checked={task.isComplete ?? false}
							onChange={() => handleComplete(task)}
						/>
						{taskInEditing._id === task._id ? (
							<div>
								<input
									value={editTitle}
									placeholder='title required'
									name='edit-title'
									onChange={(e) => setEditTitle(e.target.value)}
								/>
								<button onClick={() => handleUpdate(task)}>Save</button>
								{editErrors.title && <Error text={editErrors.title} />}
							</div>
						) : (
							<p>{task.title}</p>
						)}
						<div
							className='edit-task-icons'
							style={{
								display: 'flex',
							}}
						>
							<p
								style={{ cursor: 'pointer' }}
								onClick={() => {
									setEditTitle(task.title);
									setEditErrors({});
									setTaskInEditing(task);
								}}
							>
								e
							</p>
							<p
								style={{ cursor: 'pointer' }}
								onClick={() => {
									handleDelete(task._id);
								}}
							>
								d
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
