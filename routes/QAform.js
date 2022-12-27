const express = require('express')
const router = express.Router()
const QA_formController = require('../controllers/QA_formController')

router.get('/', QA_formController.getAllForm)
router.get('/:id', QA_formController.getById)
router.post('/', QA_formController.addForm)
router.put('/sign/:id', QA_formController.updateSign)

module.exports = router
