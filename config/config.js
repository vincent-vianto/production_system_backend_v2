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
			url: process.env.DB_PROD,
			options: {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			},
		},
	},
}
