const Store_Forms = require('../models/Store_form')

const getAllForm = async (req, res) => {
	const Store_Form = await Store_Forms.find()
		.select(['-form'])
		.populate({
			path: 'sign.user',
			select: 'username-_id',
		})
		.populate({
			path: 'checked_by.user',
			select: 'username-_id',
		})
	if (!Store_Form) return res.status(204).json({ message: 'No template found' })
	res.json(Store_Form)
}

const addForm = async (req, res) => {
	try {
		const result = await Store_Forms.create({
			general: req.body.general,
			form_name: req.body.form_name,
			date: req.body.date,
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
	const Store_Form = await Store_Forms.findById(id)
		.populate({
			path: 'sign.user',
			select: 'username-_id',
		})
		.populate({
			path: 'checked_by.user',
			select: 'username-_id',
		})

	if (!Store_Form) return res.status(204).json({ message: 'No template found' })
	res.json(Store_Form)
}

const updateChecked = async (req, res) => {
	try {
		const { id } = req.params
		const checked_by = {
			accept: req.body.accept,
			user: req.userId,
		}
		const result = await Store_Forms.findByIdAndUpdate(id, { checked_by })

		res.status(201).json({ success: `New form created!` })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

const updateSign = async (req, res) => {
	try {
		const { id } = req.params
		const Store_Form = await Store_Forms.findById(id)
		if (!Store_Form.checked_by.accept)
			return res.status(400).json({ msg: "Haven't check yet" })
		if (Store_Form.checked_by.accept === false)
			return res.status(400).json({
				msg: 'this form has been rejected before. please get checked first',
			})
		const sign = {
			accept: req.body.accept,
			user: req.userId,
		}
		const result = await Store_Forms.findByIdAndUpdate(id, { sign })

		res.status(201).json({ success: `New form created!` })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

const modifyForm = async (req, res) => {
	try {
		const { id } = req.params
		const result = await Store_Forms.findByIdAndUpdate(id, {
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
