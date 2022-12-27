const express = require('express')
const router = express.Router()
const Engineering_templateController = require('../controllers/Engineering_templateController')

router.get('/', Engineering_templateController.getAllFormNumber)
router.get('/:form_number', Engineering_templateController.getFormByFormNumber)
router.post('/', Engineering_templateController.addForm)

module.exports = router
