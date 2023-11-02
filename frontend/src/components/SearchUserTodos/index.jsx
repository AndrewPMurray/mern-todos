import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Error } from '../Error';
import { Todo } from '../Todo';

export const SearchUserTodos = ({ searchError, isSearchLoading }) => {
	const navigate = useNavigate();
	const todos = useSelector((s) => s.tasks.searchTasks);
	const foundUsername = useSelector((s) => s.tasks.searchUsername);
	const user = useSelector((s) => s.session.user);

	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
	}, [user, navigate]);

	if (isSearchLoading) return null;

	if (!user) return null;

	return (
		<div className='todos-container'>
			{foundUsername && <h1 className='todo-list-header'>{foundUsername}'s ToDos</h1>}
			<div className='todo-list' style={{ maxHeight: 'calc(75vh - 100px)' }}>
				{searchError.username ? (
					<Error text={searchError.username} />
				) : (
					todos.map((todo, i) => (
						<Todo
							key={todo._id}
							todo={todo}
							isGuestTodo={true}
							index={i}
							listLength={todos.length - 1}
						/>
					))
				)}
				<div className='fade' />
			</div>
		</div>
	);
};
