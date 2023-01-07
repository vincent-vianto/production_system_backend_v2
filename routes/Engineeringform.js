const express = require('express')
const router = express.Router()
const Engineering_formController = require('../controllers/Engineering_formController')

router.get('/', Engineering_formController.getAllForm)
router.get('/:id', Engineering_formController.getById)
router.post('/', Engineering_formController.addForm)
router.put('/sign/:id', Engineering_formController.updateSign)
router.put('/checked/:id', Engineering_formController.updateChecked)
router.put('/modify/:id', Engineering_formController.modifyForm)

module.exports = router
