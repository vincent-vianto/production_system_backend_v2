const Users = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const handleLogin = async (req, res) => {
	try {
		const user = await Users.findOne({
			username: req.body.username,
		})
		if (!user.status) return res.status(400).json({ msg: 'Not Active' })
		
		const match = await bcrypt.compare(req.body.password, user.password)
		if (!match) return res.status(400).json({ msg: 'Wrong Password' })
		
		const userId = user._id
		const role = user.role
		const username = user.username

		const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: '5s',
		})

		const refreshToken = jwt.sign(
			{ userId },
			process.env.REFRESH_TOKEN_SECRET,
			{
				expiresIn: '1d',
			}
		)
		
		await Users.findByIdAndUpdate(userId, { refresh_token: refreshToken })
		// res.cookie('refreshToken', refreshToken, {
		// 	httpOnly: true,
		// 	maxAge: 24 * 60 * 60 * 1000,
		// })
		res.json({ accessToken, refreshToken, role, username})
	} catch (error) {
		res.status(400).json({ msg: 'Username not found' })
	}
}

module.exports = { handleLogin }
