module.exports = {
	environment: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 5000,
	mongodbURI: process.env.MONGODB_URI || '',
	jwtConfig: {
		secret: process.env.JWT_SECRET,
		expiresIn: process.env.JWT_EXPIRES_IN,
	},
};
