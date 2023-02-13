const Sections = require('../models/section')

const getAllSections = async (req, res) => {
	const sections = await Sections.find().exec()
	try {
		res.status(200).json(sections)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

const addSection = async (req, res) => {
	const section = new Sections({
		name: req.body.name,
	})
	try {
		await section.save()
		res.status(200).json(section)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

const editSection = async (req, res) => {
	try {
		const { id } = req.params
		const section = await Sections.findByIdAndUpdate(
			id,
			{
				name: req.body.name,
			},
			{ new: true }
		)
		await section.save()
		res.status(200).json(section)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

const deleteSection = async (req, res) => {
	try {
		const { id } = req.params
		const section = await Sections.findByIdAndDelete(id)

		if (!section) res.status(404).json({ message: 'No section found' })
		res.status(200).send()
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

const getSectionTemplates = async (req, res) => {
	try {
		const { id } = req.params
		const section = await Sections.findById(id).populate({
			path: 'templates',
		})
		res.status(200).json(section.templates)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

module.exports = {
	getAllSections,
	addSection,
	editSection,
	deleteSection,
	getSectionTemplates,
}
