const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Users = new Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	status: {
		type: Boolean,
		required: true,
	},
	role: {
		type: String,
		required: true,
	},
	refresh_token: {
		type: String,
	},
})
module.exports = mongoose.model('Users', Users)
