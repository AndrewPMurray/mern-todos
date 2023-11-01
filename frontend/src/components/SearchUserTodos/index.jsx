import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { searchTasks } from '../../store/tasks';
import { Error } from '../Error';

export const SearchUserTodos = ({ user }) => {
	const tasks = useSelector((s) => s.tasks.searchTasks);

	const [username, setUsername] = useState('');
	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();

	const handleSearch = () => {
		if (!username) return;
		if (username === user?.username) {
			setErrors({
				username: 'Cannot search for your own tasks. Please search a different user.',
			});
			return;
		}
		setIsLoading(true);
		setErrors({});
		dispatch(searchTasks(username)).then((data) => {
			if (data.payload?.errors) {
				setErrors(data.payload.errors);
			}
			setIsLoading(false);
		});
	};

	return (
		<div>
			<div className='task-create-search-container'>
				<h3 style={{ margin: 0 }}>Search for another user's tasks:</h3>
				<input
					className='input-container'
					name='username'
					placeholder='username'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<button onClick={handleSearch}>Search</button>
			</div>
			<div>
				{errors.username ? (
					<Error text={errors.username} />
				) : isLoading ? null : (
					tasks.map((task) => (
						<div key={task._id}>
							<p>{task.title}</p>
						</div>
					))
				)}
			</div>
		</div>
	);
};
