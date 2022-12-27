const Engineering_Forms = require('../models/Engineering_form')

const getAllForm = async (req, res) => {
	const Engineering_Form = await Engineering_Forms.find()
		.select(['-form'])
		.populate({
			path: 'user',
			select: 'username-_id',
		})
		.populate({
			path: 'sign.user',
			select: 'username-_id',
		})
	if (!Engineering_Form)
		return res.status(204).json({ message: 'No template found' })
	res.json(Engineering_Form)
}

const addForm = async (req, res) => {
	try {
		const result = await Engineering_Forms.create({
			user: req.userId,
			date: req.body.date,
			form_number: req.body.form_number,
			'Measured by Technician': req.body['Measured by Technician'],
			'Aknowledge by IPQC': req.body['Aknowledge by IPQC'],
			form: req.body.form,
		})

		console.log(result)

		res.status(201).json({ success: `New form created!` })
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: err.message })
	}
}

const getById = async (req, res) => {
	const { id } = req.params
	const Engineering_Form = await Engineering_Forms.findById(id).populate({
		path: 'sign.user',
		select: 'username-_id',
	})

	if (!Engineering_Form)
		return res.status(204).json({ message: 'No template found' })
	res.json(Engineering_Form)
}

const updateSign = async (req, res) => {
	try {
		const { id } = req.params
		const sign = {
			accept: req.body.accept,
			user: req.userId,
		}
		const result = await Engineering_Forms.findByIdAndUpdate(id, { sign })

		console.log(result)

		res.status(201).json({ success: `New form created!` })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

module.exports = { getAllForm, addForm, getById, updateSign }