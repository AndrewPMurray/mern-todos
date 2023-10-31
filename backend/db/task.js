const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
	_id: String,
	title: {
		type: String,
		required: true,
	},
	isComplete: Boolean,
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},
});

const Task = mongoose.model('Task', taskSchema);

Task.createTask = async function ({ title, isComplete, user }) {
	const task = await Task.create({
		_id: new mongoose.Types.ObjectId(),
		title,
		isComplete,
		user: user,
	});

	return task;
};

module.exports = { Task };
