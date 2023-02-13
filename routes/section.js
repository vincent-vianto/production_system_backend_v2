const express = require('express')
const router = express.Router()

const sectionController = require('../controllers/sectionController')

router.get('/', sectionController.getAllSections)
router.post('/', sectionController.addSection)

router.put('/:id', sectionController.editSection)
router.delete('/:id', sectionController.deleteSection)


module.exports = router
