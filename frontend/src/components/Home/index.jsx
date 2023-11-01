import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Todos } from '../Todos';

import './Home.css';

export const Home = () => {
	const user = useSelector((s) => s.session.user);

	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
	});

	if (!user) return null;

	return (
		<div className='home-container'>
			<Todos user={user} />
		</div>
	);
};
