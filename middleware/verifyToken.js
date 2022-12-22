const jwt = require('jsonwebtoken')

module.exports.verifyToken = (req, res, next) => {
	const token = req.headers['authorization']
	if (token == null) return res.sendStatus(401)
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err) return res.sendStatus(403)
		req.userId = decoded.userId
		next()
	})
}
