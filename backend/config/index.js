module.exports = {
	environment: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 5000,
	mongodbURI: process.env.MONGODB_URI || '',
};
