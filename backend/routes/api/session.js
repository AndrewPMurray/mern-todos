const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/user');

const router = express.Router();

const validateLogin = [
	check('credential')
		.exists({ checkFalsy: true })
		.withMessage('Please provide a valid email or username'),
	check('password').exists({ checkFalsy: true }).withMessage('Please provide a password'),
	handleValidationErrors,
];

router.get('/', restoreUser, (req, res) => {
	const { user } = req;
	if (user) {
		return res.json({
			user: user,
		});
	} else return res.json({});
});

router.post(
	'/',
	validateLogin,
	asyncHandler(async (req, res, next) => {
		const { credential, password } = req.body;

		const user = await User.login({
			credential,
			password,
		});

		console.log(user);

		if (!user) {
			const err = new Error('Login failed');
			err.status = 401;
			err.title = 'Login failed';
			err.errors = { invalid: 'The provided credentials were invalid.' };
			return next(err);
		}

		await setTokenCookie(res, user);

		return res.json({
			user,
		});
	})
);

router.delete('/', (_req, res) => {
	res.clearCookie('token');
	return res.json({ message: 'success' });
});

module.exports = router;