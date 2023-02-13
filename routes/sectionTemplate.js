const express = require('express')
const router = express.Router()

const sectionTemplateController = require('../controllers/sectionTemplateController')

router.post('/', sectionTemplateController.addTemplate)

router.put('/:id', sectionTemplateController.editTemplate)
router.delete('/:id', sectionTemplateController.deleteTemplate)

module.exports = router
