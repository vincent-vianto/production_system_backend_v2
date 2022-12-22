const express = require('express')
const router = express.Router()
const formTemplateController = require('../controllers/formTemplateController')

router.get('/', formTemplateController.getAllForm)
router.get('/:form_number', formTemplateController.getFormByFormNumber)
router.post('/', formTemplateController.addForm)

module.exports = router
