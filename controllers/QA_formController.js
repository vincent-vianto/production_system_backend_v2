const QA_Forms = require('../models/QA_form')

const getAllForm = async (req, res) => {
	const QA_form = await QA_Forms.find().select(['-form'])
		.populate({
			path: 'user',
			select: 'username-_id',
		})
		.populate({
			path: 'sign.user',
			select: 'username-_id',
		})
	if (!QA_form) return res.status(204).json({ message: 'No template found' })
	res.json(QA_form)
}

const addForm = async (req, res) => {
	try {
		const result = await QA_Forms.create({
			user: req.userId,
			date: req.body.date,
			form_number: req.body.form_number,
			auditor: req.body.auditor,
			auditee: req.body.auditee,
			score: req.body.score,
			form: req.body.form,
		})

		console.log(result)

		res.status(201).json({ success: `New form created!` })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

const getById = async (req, res) => {
	const { id } = req.params
	const QA_form = await QA_Forms.findById(id).populate({
		path: 'sign.user',
		select: 'username-_id',
	})

	if (!QA_form) return res.status(204).json({ message: 'No template found' })
	res.json(QA_form)
}

const updateSign = async (req, res) => {
	try {
		const { id } = req.params
		const sign = {
			accept: req.body.accept,
			user: req.userId,
		}
		const result = await QA_Forms.findByIdAndUpdate(id, { sign })

		console.log(result)

		res.status(201).json({ success: `New form created!` })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

module.exports = { getAllForm, addForm, getById, updateSign }
