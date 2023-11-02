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
			<div className='nav-section'>
				<NavLink to='/'>
					<p>
						<i className='fa-solid fa-house nav-icon' />
						Home
					</p>
				</NavLink>
				{user && (
					<div style={{ padding: '10px' }}>
						<p className='nav-text'>Welcome,</p>
						<p className='nav-text'>
							{user.username.length > 15
								? `${user.username.slice(0, 15)}...`
								: user.username}
						</p>
					</div>
				)}
				{user && (
					<div style={{ padding: '10px' }}>
						<p className='nav-text'>
							<i className='fa-solid fa-magnifying-glass nav-icon' />
							Search ToDos
						</p>
						<input
							className='search-input'
							placeholder='Enter a username'
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
					</div>
				)}
			</div>
			{isLoaded && (
				<div className='nav-section'>
					{!user && (
						<NavLink to='/signup'>
							<p>
								<i className='fa-solid fa-user-plus nav-icon' />
								Sign Up
							</p>
						</NavLink>
					)}
					{!user && (
						<NavLink to='/login'>
							<p>
								<i className='fa-solid fa-arrow-right-from-bracket nav-icon' />
								Login
							</p>
						</NavLink>
					)}
					{user && (
						<NavLink to='#' onClick={handleLogout}>
							<p>
								<i className='fa-solid fa-arrow-right-from-bracket nav-icon' />
								Logout
							</p>
						</NavLink>
					)}
				</div>
			)}
		</ul>
	);
};
