import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { restoreUser } from './store/session';

import { Home } from './components/Home';
import { Login } from './components/Login';
import { Nav } from './components/Nav';
import { Signup } from './components/Signup';

import './App.css';

function App() {
	const dispatch = useDispatch();

	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		isLoaded && (
			<BrowserRouter>
				<Nav isLoaded={isLoaded} />
				<div>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='login' element={<Login />} />
						<Route path='signup' element={<Signup />} />
					</Routes>
				</div>
			</BrowserRouter>
		)
	);
}

export default App;
