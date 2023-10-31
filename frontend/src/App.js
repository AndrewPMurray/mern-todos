import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import * as sessionActions from './store/session';

import { Login } from './components/Login/Login';
import { Signup } from './components/Signup/Signup';

import './App.css';
import { Home } from './components/Home/Home';

function App() {
	const dispatch = useDispatch();

	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		isLoaded && (
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='login' element={<Login />} />
					<Route path='signup' element={<Signup />} />
				</Routes>
			</BrowserRouter>
		)
	);
}

export default App;
