const Form_Templates = require('../models/form_template')

const getAllForm = async (req, res) => {
	const form_templates = await Form_Templates.find()
	if (!form_templates)
		return res.status(204).json({ message: 'No template found' })
	res.json(form_templates)
}

const addForm = async (req, res) => {
	try {
		const result = await Form_Templates.create({
			name: req.body.name,
			description: req.body.description,
			form_number: req.body.form_number,
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
	const form = await Form_Templates.findOne({
		form_number: req.params.form_number,
	}).exec()
	if (!form) {
		return res
			.status(204)
			.json({ message: `Form number ${req.params.form_number} not found` })
	}
	res.json(form)
}

// const deleteUser = async (req, res) => {
// 	if (!req?.body?.id)
// 		return res.status(400).json({ message: 'User ID required' })
// 	const user = await User.findOne({ _id: req.body.id }).exec()
// 	if (!user) {
// 		return res.status(204).json({ message: `User ID ${req.body.id} not found` })
// 	}
// 	const result = await user.deleteOne({ _id: req.body.id })
// 	res.json(result)
// }

// const getUser = async (req, res) => {
// 	if (!req?.params?.id)
// 		return res.status(400).json({ message: 'User ID required' })
// 	const user = await User.findOne({ _id: req.params.id }).exec()
// 	if (!user) {
// 		return res
// 			.status(204)
// 			.json({ message: `User ID ${req.params.id} not found` })
// 	}
// 	res.json(user)
// }

module.exports = {
	getAllForm,
	addForm,
	getFormByFormNumber,
}
