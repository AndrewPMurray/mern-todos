import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import * as sessionActions from './store/session';

import './App.css';

function App() {
	const dispatch = useDispatch();

	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
		dispatch(
			sessionActions.signup({
				username: 'test',
				email: 'test@google.com',
				password: 'awesome1234!',
				confirmPassword: 'awesome1234!',
			})
		);
	}, [dispatch]);

	return (
		isLoaded && (
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<p>home</p>} />
					<Route path='login' element={<p>login page</p>} />
				</Routes>
			</BrowserRouter>
		)
	);
}

export default App;
