import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { Error } from '../Error';

import { login } from '../../store/session';

import './Login.css';

export const Login = () => {
	const user = useSelector((s) => s.session.user);
	const [credential, setCredential] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) return;
		navigate('/');
	}, [navigate, user]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});
		return dispatch(login({ credential, password })).then((data) => {
			if (data?.payload?.errors) {
				setErrors(data.payload.errors);
			}
		});
	};

	return (
		<div className='component-sub-container'>
			<div className='user-login-container'>
				<div className='login-header'>
					<h2>Welcome to your ToDos</h2>
					<h3>
						Please login below or <Link to='/signup'>signup</Link>
					</h3>
				</div>
				<form onSubmit={handleSubmit}>
					<div className='input-container'>
						<div className='input'>
							<label>Email or Username:</label>
							<input
								name='credential'
								value={credential}
								placeholder='Enter email or username'
								onChange={(e) => setCredential(e.target.value)}
							/>
							{errors.credential && <Error text={errors.credential} />}
						</div>
					</div>
					<div className='input-container'>
						<div className='input'>
							<label>Password:</label>
							<input
								type='password'
								name='password'
								value={password}
								placeholder='Enter password'
								onChange={(e) => setPassword(e.target.value)}
							/>
							{errors.password && <Error text={errors.password} />}
						</div>
					</div>
					<div className='input'>
						<button type='submit'>Login</button>
					</div>
				</form>
				{errors.invalid && <Error text={errors.invalid} />}
			</div>
		</div>
	);
};
