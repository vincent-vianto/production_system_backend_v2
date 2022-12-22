var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' })
})

const authController = require('../controllers/authController')
const logoutController = require('../controllers/logoutController')
const refreshTokenController = require('../controllers/refreshTokenController')

const userRouter = require('./users')
const formTemplateRouter = require('./form_templates')
const auditRouter = require('./audits')
const { verifyToken } = require('../middleware/verifyToken')

router.post('/login', authController.handleLogin)
router.post('/logout', logoutController.handleLogout)
router.post('/refresh', refreshTokenController.handleRefreshToken)

router.use('/user', userRouter)

router.use('/form', verifyToken, formTemplateRouter)
router.use('/audit', verifyToken, auditRouter)

module.exports = router
