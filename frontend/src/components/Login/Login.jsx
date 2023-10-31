import { useState } from 'react';

import './Login.css';

export const Login = () => {
	const [credential, setCredential] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState(null);

	const handleSubmit = () => {
		console.log({ credential, password });
	};
	return (
		<div className='user-login-container'>
			<p>Login!</p>
		</div>
	);
};
