import { useSelector } from 'react-redux';

export const Home = () => {
	const user = useSelector((s) => s.session.user);

	console.log(user);

	if (!user) return <p>Please login to see your todo list</p>;

	return <p>You are logged in!</p>;
};
