const Sections = require('../models/section')
const Templates = require('../models/section_template')

const addTemplate = async (req, res) => {
	const template = new Templates({
		name: req.body.name,
		description: req.body.description,
		form_number: req.body.form_number,
		general: req.body.general,
		template: req.body.template,
	})
	try {
		const newTemplate = await template.save()
		const section = await Sections.findByIdAndUpdate(req.body.section_id, {
			$push: { templates: newTemplate._id },
		})
		res.status(200).json(newTemplate)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

const editTemplate = async (req, res) => {
	try {
		const { id } = req.params
		const template = await Templates.findByIdAndUpdate(
			id,
			{
				name: req.body.name,
				description: req.body.description,
				form_number: req.body.form_number,
				general: req.body.general,
				template: req.body.template,
			},
			{ new: true }
		)
		await template.save()
		res.status(200).json(template)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

const deleteTemplate = async (req, res) => {
	try {
		const { id } = req.params

		const section = await Sections.findOneAndUpdate(
			{ templates: id },
			{
				$pull: { templates: id },
			}
		)
		const template = await Templates.findByIdAndDelete(id)
		if (!template) res.status(404).json({ message: 'No template found' })

		res.status(200).send()
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

module.exports = {
	addTemplate,
	editTemplate,
	deleteTemplate,
}
