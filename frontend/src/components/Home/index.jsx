import { useSelector } from 'react-redux';

import { Todos } from '../Todos';

import './Home.css';

export const Home = () => {
	const user = useSelector((s) => s.session.user);

	return (
		<div className='home-container'>
			<Todos user={user} />
		</div>
	);
};
