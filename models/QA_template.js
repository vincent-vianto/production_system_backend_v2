const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QA_template = new Schema({
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
		unique: true,
	},
	general: {
		type: [
			{
				item: {
					type: String,
					required: true,
				},
				field: {
					type: {
						type: String,
						required: true,
						enum: ['text', 'number', 'radio'],
					},
					opt: {
						type: Array,
						required: function () {
							return this.field.type === 'radio'
						},
					},
				},
			},
		],
		validate: (v) => Array.isArray(v) && v.length > 0,
	},
	template: {
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
							field: {
								type: {
									type: String,
									required: true,
									enum: ['text', 'number', 'radio'],
								},
								opt: {
									type: mongoose.Schema.Types.Mixed,
									required: function () {
										return this.field.type === 'radio'
									},
								},
							},
							comment: {
								type: Boolean,
								default: false,
							},
						},
					],
					validate: (v) => Array.isArray(v) && v.length > 0,
				},
			},
		],
		validate: (v) => Array.isArray(v) && v.length > 0,
	},
})
module.exports = mongoose.model('QA_template', QA_template)
