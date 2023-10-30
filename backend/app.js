const express = require('express');
const chalk = require('chalk');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');

const { environment, port, mongodbURI } = require('./config');
const routes = require('./routes');
const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// cors to be used only in development or testing
if (!isProduction) {
	app.use(cors());
}
// set helmet headers for improved security of the app
app.use(
	helmet.crossOriginResourcePolicy({
		policy: 'cross-origin',
	})
);
app.use(
	csurf({
		cookie: {
			secure: isProduction,
			sameSite: isProduction && 'lax',
			httpOnly: true,
		},
	})
);

app.use(routes);

// Catch unhandled requests for error handling
app.use((_req, _res, next) => {
	const err = new Error('The requested resource could not be found.');
	err.title = 'Resource Not Found';
	err.errors = ['The requested resource could not be found.'];
	err.status = 404;
	next(err);
});

app.use((err, _req, res, _next) => {
	res.status(err.status || 500);
	console.error(err);
	return res.json({
		title: err.title || 'Server Error',
		message: err.message,
		errors: err.errors,
		stack: isProduction ? null : err.stack,
	});
});

mongoose
	.connect(mongodbURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Connection to MongoDB successful!');
		app.listen(port, () => console.log(`App is now listening on port: ${chalk.green(port)}`));
	})
	.catch((e) => {
		throw new Error('Unable to connect to MongoDB. Terminating...', e);
	});
