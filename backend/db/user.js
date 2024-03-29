const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	_id: String,
	username: String,
	email: String,
	hashedPassword: String,
	tasks: [
		{
			type: mongoose.Schema.ObjectId,
			ref: 'Task',
		},
	],
});

const User = mongoose.model('User', userSchema);

User.login = async function ({ credential, password }) {
	const user = await User.findOne().or([
		{ username: { $regex: credential, $options: 'i' } },
		{ email: { $regex: credential, $options: 'i' } },
	]);

	if (user && user.validatePassword(password)) {
		return user.toSafeObject();
	}
};

User.signup = async function ({ username, email, password }) {
	const hashedPassword = bcrypt.hashSync(password);
	const user = await User.create({
		_id: new mongoose.Types.ObjectId(),
		username,
		email,
		hashedPassword,
	});
	return user.toSafeObject();
};

User.prototype.toSafeObject = function () {
	const { _id, username, email } = this;
	return { id: _id, username, email };
};

User.prototype.validatePassword = function (password) {
	return bcrypt.compareSync(password, this.hashedPassword.toString());
};

module.exports = { User };
