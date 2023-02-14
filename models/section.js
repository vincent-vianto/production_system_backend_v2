const mongoose = require('mongoose')
const Schema = mongoose.Schema

const section = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		templates: [
			{
				type: Schema.Types.ObjectId,
				ref: 'section_template',
			},
		],
		forms: [
			{
				type: Schema.Types.ObjectId,
				ref: 'section_template',
			},
		],
	},
	{ versionKey: false }
)

module.exports = mongoose.model('section', section)
