import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { restoreUser } from './store/session';

import { Home } from './components/Home';
import { Login } from './components/Login';
import { Nav } from './components/Nav';
import { Signup } from './components/Signup';
import { SearchUserTodos } from './components/SearchUserTodos';
import { searchTasks } from './store/tasks';

function App() {
	const dispatch = useDispatch();
	const user = useSelector((s) => s.session.user);

	const [isLoading, setIsLoading] = useState(false);
	const [isSearchLoading, setIsSearchLoading] = useState(false);
	const [searchUsername, setSearchUsername] = useState('');
	const [searchError, setSearchError] = useState({});

	useEffect(() => {
		dispatch(restoreUser()).then(() => setIsLoading(true));
	}, [dispatch]);

	const handleSearch = () => {
		if (searchUsername === user?.username) {
			setSearchError({
				username: 'Cannot search for your own tasks. Please search a different user.',
			});
			return;
		}
		setIsSearchLoading(true);
		setSearchError({});
		dispatch(searchTasks(searchUsername)).then((data) => {
			if (data.payload?.errors) {
				setSearchError(data.payload.errors);
			}
			setIsSearchLoading(false);
		});
	};

	return (
		isLoading && (
			<BrowserRouter>
				<div className='app-container'>
					<Nav
						isLoaded={isLoading}
						searchUsername={searchUsername}
						setSearchUsername={setSearchUsername}
						handleSearch={handleSearch}
					/>
					<div className='component-container'>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/login' element={<Login />} />
							<Route path='/signup' element={<Signup />} />
							<Route
								path='/search'
								element={
									<SearchUserTodos
										isSearchLoading={isSearchLoading}
										searchError={searchError}
									/>
								}
							/>
						</Routes>
					</div>
				</div>
			</BrowserRouter>
		)
	);
}

export default App;
