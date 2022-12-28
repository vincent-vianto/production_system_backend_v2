const express = require('express')
const router = express.Router()
const Store_templateController = require('../controllers/Store_templateController')

router.get('/', Store_templateController.getAllFormNumber)
router.get('/:form_number', Store_templateController.getFormByFormNumber)
router.post('/', Store_templateController.addForm)

module.exports = router
