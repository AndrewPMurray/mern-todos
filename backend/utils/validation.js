const { validationResult } = require('express-validator');

handleValidationErrors = function (req, _res, next) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const errorMessages = {};

		errors.array({ onlyFirstError: true }).forEach((e) => (errorMessages[e.path] = e.msg));

		return next({ title: 'Bad request', status: 400, errors: errorMessages });
	}
	return next();
};

module.exports = { handleValidationErrors };
