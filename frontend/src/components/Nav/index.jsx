import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './Nav.css';
import { logout } from '../../store/session';
import { clearState } from '../../store/tasks';

export const Nav = ({ isLoaded }) => {
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(clearState());
		dispatch(logout());
	};

	return (
		<div className='nav-container'>
			<ul className='nav'>
				<NavLink to='/'>
					<h1>ToDos</h1>
				</NavLink>
				{isLoaded && (
					<div className='login-signup-links'>
						{!user && <NavLink to='/login'>Login</NavLink>}
						{!user && <NavLink to='/signup'>Sign Up!</NavLink>}
						{user && (
							<NavLink to='#' onClick={handleLogout}>
								Logout
							</NavLink>
						)}
					</div>
				)}
			</ul>
		</div>
	);
};
