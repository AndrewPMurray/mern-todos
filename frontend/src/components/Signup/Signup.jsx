import { useState } from 'react';

import './Signup.css';
import { useDispatch } from 'react-redux';
import { signup } from '../../store/session';

export const Signup = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errors, setErrors] = useState(null);

	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});
		return dispatch(signup({ email, username, password, confirmPassword })).then((data) => {
			if (data?.payload?.errors) {
				console.log(data.payload.errors);
				setErrors(data.payload.errors);
			} else if (data?.payload?.user) {
				// redirect to home page
			}
		});
	};

	return (
		<div className='signup-container'>
			<form onSubmit={handleSubmit}>
				<label>Username:</label>
				<input
					name='username'
					value={username}
					placeholder='Choose a unique username'
					onChange={(e) => setUsername(e.target.value)}
				/>
				<label>Email Address:</label>
				<input
					name='email'
					value={email}
					placeholder='Please provide your email address'
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label>Password:</label>
				<input
					name='password'
					value={password}
					placeholder='Use a secure password'
					onChange={(e) => setPassword(e.target.value)}
				/>
				<label>Confirm Password:</label>
				<input
					name='confirm-password'
					value={confirmPassword}
					placeholder='Please confirm your password'
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
};
