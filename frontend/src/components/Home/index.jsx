import { useSelector } from 'react-redux';

import { Todos } from '../Todos';

import './Home.css';
import { SearchUserTodos } from '../SearchUserTodos';

export const Home = () => {
	const user = useSelector((s) => s.session.user);

	return (
		<div className='home-container'>
			<Todos user={user} />
			<SearchUserTodos user={user} />
		</div>
	);
};
