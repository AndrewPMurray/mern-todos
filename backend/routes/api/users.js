const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db');

const router = express.Router();

const validateSignup = [
	check('email')
		.exists({ checkFalsy: true })
		.withMessage('Please enter an email address')
		.isEmail()
		.withMessage('Email address is not valid')
		.custom((value) => {
			return User.findOne({ email: { $regex: value, $options: 'i' } }).then((user) => {
				if (user) {
					return Promise.reject(
						'The provided email address is already in use by another account'
					);
				}
			});
		}),
	check('username')
		.exists({ checkFalsy: true })
		.withMessage('Please enter a username')
		.isLength({ min: 4 })
		.withMessage('Username must be more than 4 characters')
		.not()
		.isEmail()
		.withMessage('Username cannot be an email address.')
		.custom((value) => {
			return User.findOne({ username: { $regex: value, $options: 'i' } }).then((user) => {
				if (user) {
					return Promise.reject(
						'The provided username is already in use by another account'
					);
				}
			});
		}),
	check('password')
		.exists({ checkFalsy: true })
		.withMessage('Please enter a secure password')
		.isLength({ min: 8 })
		.withMessage('Password must be at least 8 characters long')
		.custom((value) => {
			const letterCheck = /^(?=.*[a-z]).*(?=.*[A-Z]).+$/g;
			const numCheck = /^(?=.*[0-9]).+$/g;
			const specCharCheck = /^(?=.*[!@#$%^&*]).+$/g;
			if (!letterCheck.test(value)) {
				throw new Error(
					'Password must contain at least 1 lowercase and one uppercase letter'
				);
			}
			if (!numCheck.test(value)) {
				throw new Error('Password must contain at least 1 number');
			}
			if (!specCharCheck.test(value)) {
				throw new Error(
					'Password must contain at least 1 special character: ! @ # $ % ^ & * ( )'
				);
			}
			return true;
		}),
	check('confirmPassword')
		.exists({ checkFalsy: true })
		.withMessage('Please confirm your password')
		.custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error('Password and confirm password do not match');
			}
			return true;
		}),
	handleValidationErrors,
];

router.post(
	'/',
	validateSignup,
	asyncHandler(async (req, res) => {
		const { email, password, username } = req.body;
		const user = await User.signup({
			email,
			username: username,
			password,
		});

		await setTokenCookie(res, user);

		return res.json({
			user,
		});
	})
);

module.exports = router;
