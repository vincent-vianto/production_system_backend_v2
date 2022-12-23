const Users = require('../models/User')

const handleLogout = async (req, res) => {
	const refreshToken = req.body.refreshToken
	if (!refreshToken) return res.sendStatus(204)
	const user = await Users.findOne({ refresh_token: refreshToken })
	if (!user) return res.sendStatus(204)
	const userId = user._id
	await Users.findByIdAndUpdate(userId, { refresh_token: null })

	// res.clearCookie('refreshToken')
	return res.sendStatus(200)
}

module.exports = { handleLogout }
