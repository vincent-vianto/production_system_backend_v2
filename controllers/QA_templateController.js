const QA_templates = require('../models/QA_template')

const getAllFormNumber = async (req, res) => {
	const QA_template = await QA_templates.find().select('form_number name')
	if (!QA_template)
		return res.status(204).json({ message: 'No template found' })
	res.json(QA_template)
}

const addForm = async (req, res) => {
	try {
		const result = await QA_templates.create({
			name: req.body.name,
			description: req.body.description,
			form_number: req.body.form_number,
			general: req.body.general,
			template: req.body.template,
		})

		console.log(result)

		res
			.status(201)
			.json({ success: `New template ${req.body.form_number} created!` })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

const getFormByFormNumber = async (req, res) => {
	if (!req?.params?.form_number)
		return res.status(400).json({ message: 'Form Number required' })
	const form = await QA_templates.findOne({
		form_number: req.params.form_number,
	}).exec()
	if (!form) {
		return res
			.status(204)
			.json({ message: `Form number ${req.params.form_number} not found` })
	}
	res.json(form)
}

module.exports = {
	getAllFormNumber,
	addForm,
	getFormByFormNumber,
}
