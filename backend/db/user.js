const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	username: String,
	email: String,
	hashedPassword: String,
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
