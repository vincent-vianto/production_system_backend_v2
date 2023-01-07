const express = require('express')
const router = express.Router()
const Store_formController = require('../controllers/Store_formController')

router.get('/', Store_formController.getAllForm)
router.get('/:id', Store_formController.getById)
router.post('/', Store_formController.addForm)
router.put('/sign/:id', Store_formController.updateSign)
router.put('/checked/:id', Store_formController.updateChecked)
router.put('/modify/:id', Store_formController.modifyForm)


module.exports = router
