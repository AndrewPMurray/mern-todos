const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { User, Task } = require('../../db');

const router = express.Router();

const validateTitle = [
	check('title').exists({ checkFalsy: true }).withMessage('Title is required'),
	handleValidationErrors,
];

router.get(
	'/:username',
	requireAuth,
	asyncHandler(async (req, res, next) => {
		const { username } = req.params;
		const user = await User.findOne({ username }).populate('tasks');

		if (!user) {
			res.status(404);
			return next({
				title: 'Bad request',
				status: 400,
				errors: { username: 'No user found with that username' },
			});
		}

		return res.json({ tasks: user.tasks ?? [] });
	})
);

router.post(
	'/',
	validateTitle,
	asyncHandler(async (req, res) => {
		const user = await User.findById(req.body.user);
		const newTask = await Task.createTask(req.body);

		user.tasks.push(newTask);
		await user.save();

		return res.json({ newTask });
	})
);

router.put(
	'/',
	validateTitle,
	asyncHandler(async (req, res) => {
		const task = req.body;
		const updatedTask = await Task.findByIdAndUpdate(task._id, task, { new: true });

		return res.json({ updatedTask });
	})
);

router.delete(
	'/',
	requireAuth,
	asyncHandler(async (req, res) => {
		const { id } = req.body;

		const deletedTask = await Task.findOneAndDelete({ _id: id });

		return res.json({ deletedTask });
	})
);

module.exports = router;
