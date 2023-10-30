const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	_id: String,
	username: String,
	email: String,
	hashedPassword: String,
});

const User = mongoose.model('User', userSchema);

User.login = async function ({ credential, password }) {
	const user = await User.findOne()
		.or([{ username: credential }, { email: credential }])
		.exec();

	if (user && user.validatePassword(password)) {
		return user.toSafeObject();
	}
};

User.signup = async function ({ username, email, password }) {
	console.log('so far, so good');
	const hashedPassword = bcrypt.hashSync(password);
	// const user = await User.create({
	// 	username,
	// 	email,
	// 	hashedPassword,
	// });
	// return await User.scope('currentUser').findByPk(user.id);
};

User.prototype.toSafeObject = function () {
	const { _id, username, email } = this;
	return { _id, username, email };
};

User.prototype.validatePassword = function (password) {
	return bcrypt.compareSync(password, this.hashedPassword.toString());
};

module.exports = { User };
