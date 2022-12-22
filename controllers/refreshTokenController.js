const Users = require('../models/User')
const jwt = require('jsonwebtoken')

const handleRefreshToken = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken

		if (!refreshToken) return res.sendStatus(401)
		const user = await Users.findOne({ refresh_token: refreshToken })
		if (!user) return res.sendStatus(403)

		jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET,
			(err, decoded) => {
				if (err) return res.sendStatus(403)
				const userId = user._id
				const role = user.role
				const accessToken = jwt.sign(
					{ userId },
					process.env.ACCESS_TOKEN_SECRET,
					{
						expiresIn: '15s',
					}
				)
				res.json({ accessToken, role })
			}
		)
	} catch (error) {
		console.log(error)
	}
}

module.exports = { handleRefreshToken }
