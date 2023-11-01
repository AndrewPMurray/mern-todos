import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { logout } from '../../store/session';
import { clearState } from '../../store/tasks';

import './Nav.css';

export const Nav = ({ isLoaded, searchUsername, setSearchUsername, handleSearch }) => {
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		setSearchUsername('');
		dispatch(clearState());
		dispatch(logout());
	};

	return (
		<ul className='nav-container'>
			<div>
				<NavLink to='/'>
					<h1 style={{ width: '100%', textAlign: 'center' }}>Home</h1>
				</NavLink>
				{user && <p style={{ marginTop: '20px', fontSize: '14px' }}>Search ToDos</p>}
				{user && (
					<input
						className='search-input'
						placeholder='username'
						value={searchUsername}
						onChange={(e) => setSearchUsername(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								if (!searchUsername) return;
								handleSearch();
								navigate('/search');
							}
						}}
					/>
				)}
			</div>
			{isLoaded && (
				<div className='login-signup-links'>
					{!user && <NavLink to='/login'>Login</NavLink>}
					{!user && <NavLink to='/signup'>Sign Up</NavLink>}
					{user && (
						<NavLink to='#' onClick={handleLogout}>
							Logout
						</NavLink>
					)}
				</div>
			)}
		</ul>
	);
};
