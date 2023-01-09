const QA_Forms = require('../models/QA_form')

const getAllForm = async (req, res) => {
	const QA_form = await QA_Forms.find()
		.select(['-form', '-general.Auditee', '-general.Score'])
		.populate({
			path: 'sign.user',
			select: 'username-_id',
		})
		.populate({
			path: 'checked_by.user',
			select: 'username-_id',
		})
	if (!QA_form) return res.status(204).json({ message: 'No template found' })
	res.json(QA_form)
}

const addForm = async (req, res) => {
	try {
		const result = await QA_Forms.create({
			general: req.body.general,
			date: req.body.date,
			form_name: req.body.form_name,
			form_number: req.body.form_number,
			form: req.body.form,
		})

		res.status(201).json({ success: `New form created!` })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

const getById = async (req, res) => {
	const { id } = req.params
	const QA_form = await QA_Forms.findById(id)
		.populate({
			path: 'sign.user',
			select: 'username-_id',
		})
		.populate({
			path: 'checked_by.user',
			select: 'username-_id',
		})

	if (!QA_form) return res.status(204).json({ message: 'No template found' })
	res.json(QA_form)
}

const updateChecked = async (req, res) => {
	try {
		const { id } = req.params
		const checked_by = {
			accept: req.body.accept,
			user: req.userId,
		}
		const result = await QA_Forms.findByIdAndUpdate(id, { checked_by })

		res.status(201).json({ success: `New form created!` })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

const updateSign = async (req, res) => {
	try {
		const { id } = req.params
		const QA_form = await QA_Forms.findById(id)
		if (!QA_form.checked_by.accept)
			return res.status(400).json({ msg: "Haven't check yet" })
		if (QA_form.checked_by.accept === false)
			return res.status(400).json({
				msg: 'this form has been rejected before. please get checked first',
			})
		const sign = {
			accept: req.body.accept,
			user: req.userId,
		}
		const result = await QA_Forms.findByIdAndUpdate(id, { sign })

		res.status(201).json({ success: `New form created!` })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

const modifyForm = async (req, res) => {
	try {
		const { id } = req.params
		const result = await QA_Forms.findByIdAndUpdate(id, {
			general: req.body.general,
			form: req.body.form,
			$unset: { checked_by: '', sign: '' },
			$inc: { __v: 1 }
		},)

		res.status(201).json({ success: `New form created!` })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

module.exports = { getAllForm, addForm, getById, updateSign, updateChecked, modifyForm }
