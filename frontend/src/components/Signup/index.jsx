import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Error } from '../Error';

import { signup } from '../../store/session';

import './Signup.css';

export const Signup = () => {
	const user = useSelector((s) => s.session.user);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errors, setErrors] = useState({});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) return;
		navigate('/');
	}, [user, navigate]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});
		return dispatch(signup({ email, username, password, confirmPassword })).then((data) => {
			if (data?.payload?.errors) {
				setErrors(data.payload.errors);
			}
		});
	};

	return (
		<div>
			<div className='signup-container'>
				<form onSubmit={handleSubmit}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'space-between',
							justifyContent: 'space-between',
							width: '500px',
						}}
					>
						<div className='signup-sub-container'>
							<div className='input-container'>
								<div className='input'>
									<label>Username:</label>
									<input
										name='username'
										value={username}
										placeholder='Choose a unique username'
										onChange={(e) => setUsername(e.target.value)}
									/>
									{errors.username && <Error text={errors.username} />}
								</div>
							</div>
							<div className='input-container'>
								<div className='input'>
									<label>Email Address:</label>
									<input
										name='email'
										value={email}
										placeholder='Please provide your email address'
										onChange={(e) => setEmail(e.target.value)}
									/>
									<Error text={errors.email ? errors.email : ''} />
								</div>
							</div>
						</div>
						<div className='signup-sub-container'>
							<div className='input-container'>
								<div className='input'>
									<label>Password:</label>
									<input
										type='password'
										name='password'
										value={password}
										placeholder='Use a secure password'
										onChange={(e) => setPassword(e.target.value)}
									/>
									{errors.password && <Error text={errors.password} />}
								</div>
							</div>
							<div className='input-container'>
								<div className='input'>
									<label>Confirm Password:</label>
									<input
										type='password'
										name='confirm-password'
										value={confirmPassword}
										placeholder='Please confirm your password'
										onChange={(e) => setConfirmPassword(e.target.value)}
									/>

									<Error
										text={errors.confirmPassword ? errors.confirmPassword : ''}
									/>
								</div>
							</div>
						</div>
					</div>
					<button type='submit'>Submit</button>
				</form>
			</div>
			<p
				style={{
					fontSize: '12px',
					marginTop: '5px',
					width: '80%',
					minWidth: '200px',
					lineHeight: '1.2',
				}}
			>
				Note: Passwords must be at least 8 characters long and contain one uppercase letter,
				one number, and one special character
			</p>
		</div>
	);
};
