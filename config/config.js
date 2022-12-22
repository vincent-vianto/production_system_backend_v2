require('dotenv').config()
module.exports = {
	development: {
		database: {
			url: process.env.DB_DEV,
			options: {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			},
		},
	},
	test: {
		database: {
			url: 'mongodb://localhost/mongoose_test',
			options: {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			},
		},
	},
	production: {
		database: {
			protocol: 'mongodb',
			username: process.env.DB_PROD_USERNAME,
			password: process.env.DB_PROD_PASS,
			name: process.env.DB_PROD_DATABSE,
			host: process.env.DB_PROD_HOST,
			port: process.env.PORT,
			options: {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			},
		},
	},
}
