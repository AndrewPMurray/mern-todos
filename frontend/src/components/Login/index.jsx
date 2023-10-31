import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
		<div className='user-login-container'>
			<form onSubmit={handleSubmit}>
				<div className='input-container'>
					<label>Email or Username:</label>
					<input
						name='credential'
						value={credential}
						placeholder='Enter email or username'
						onChange={(e) => setCredential(e.target.value)}
					/>
					{errors.credential && <Error text={errors.credential} />}
				</div>
				<div className='input-container'>
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
				<button type='submit'>Submit</button>
			</form>
			{errors.invalid && <Error text={errors.invalid} />}
		</div>
	);
};
