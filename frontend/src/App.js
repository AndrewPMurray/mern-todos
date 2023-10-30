import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<p>home</p>} />
				<Route path='login' element={<p>login page</p>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
