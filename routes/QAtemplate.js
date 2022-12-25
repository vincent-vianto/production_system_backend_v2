const express = require('express')
const router = express.Router()
const QA_templateController = require('../controllers/QA_templateController')

router.get('/', QA_templateController.getAllFormNumber)
router.get('/:form_number', QA_templateController.getFormByFormNumber)
router.post('/', QA_templateController.addForm)

module.exports = router
