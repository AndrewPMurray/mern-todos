const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	isComplete: Boolean,
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
	},
});

const Task = mongoose.model('Task', taskSchema);

module.exports = { Task };
