const mongoose = require('mongoose')
const Schema = mongoose.Schema

const store_form = new Schema({
	general: {
		type: mongoose.Schema.Types.Mixed,
		required: true
	},
	form_name: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	form_number: {
		type: String,
		required: true,
	},
	checked_by: {
		user: {
			type: Schema.Types.ObjectId,
			ref: 'Users',
		},
		accept: {
			type: Boolean,
		},
	},
	sign: {
		user: {
			type: Schema.Types.ObjectId,
			ref: 'Users',
		},
		accept: {
			type: Boolean,
		},
	},
	form: [
		{
			category: String,
			items: {
				type: Schema.Types.Mixed,
			},
		},
	],
})
module.exports = mongoose.model('store_form', store_form)