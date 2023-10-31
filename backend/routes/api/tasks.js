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
	'/:userId',
	requireAuth,
	asyncHandler(async (req, res) => {
		const { userId } = req.params;
		const user = await User.findById(userId).populate('tasks');

		return res.json({ tasks: user.tasks ?? [] });
	})
);

router.post(
	'/',
	requireAuth,
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
	requireAuth,
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
