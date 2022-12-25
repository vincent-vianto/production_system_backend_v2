const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QA_form = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Users',
	},
	date: {
		type: Date,
		required: true,
	},
	form_number: {
		type: String,
		required: true,
	},
	auditor: {
		type: String,
		required: true,
	},
	auditee: {
		type: String,
		required: true,
	},
	score: {
		type: Number,
		required: true,
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
module.exports = mongoose.model('QA_Form', QA_form)
