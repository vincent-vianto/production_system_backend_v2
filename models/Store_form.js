const mongoose = require('mongoose')
const Schema = mongoose.Schema

const store_form = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'Users',
		required: true,
	},
	general: {
		type: [
			{
				item: {
					type: String,
					required: true,
				},
				value: {
					type: Schema.Types.Mixed,
					required: true,
					validate: (v) =>
						typeof v === 'string' || typeof v === 'number',
				},
			},
		],
		validate: (v) => Array.isArray(v) && v.length > 0,
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
	form: {
		type: [
			{
				category: String,
				items: {
					type: [
						{
							item: {
								type: String,
								required: true,
							},
							value: {
								type: Schema.Types.Mixed, 
								required: true,
								validate: (v) =>
									typeof v === 'string' || typeof v === 'number',
							},
							comment: String,
							passed: Boolean,
						},
					],
					validate: (v) => Array.isArray(v) && v.length > 0,
				},
			},
		],
		validate: (v) => Array.isArray(v) && v.length > 0,
	},
})
module.exports = mongoose.model('store_form', store_form)