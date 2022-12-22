const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Form_Templates = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	form_number: {
		type: String,
		required: true,
	},
	template: [
		{
			category: String,
			items: {
				type: mongoose.Schema.Types.Mixed,
				required: true,
			},
		},
	],
})
module.exports = mongoose.model('Form_Template', Form_Templates)
