const express = require('express')
const router = express.Router()
const auditController = require('../controllers/auditController')

router.get('/', auditController.getAllAudit)
router.get('/:id', auditController.getById)
router.post('/', auditController.addAudit)
router.put('/sign/:id', auditController.updateSign)

module.exports = router
