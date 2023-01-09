const User = require('../models/User')
const bcrypt = require('bcrypt')

const getAllUsers = async (req, res) => {
	const users = await User.find()
	if (!users) return res.status(204).json({ message: 'No users found' })
	res.json(users)
}
const addUser = async (req, res) => {
	const { username, password, status, role } = req.body
	if (!username || !password)
		return res
			.status(400)
			.json({ message: 'Username and password are required.' })

	const duplicate = await User.findOne({ username: username }).exec()
	if (duplicate) return res.sendStatus(409)

	try {
		const hashedPassword = await bcrypt.hash(password, 10)

		const result = await User.create({
			username: username,
			password: hashedPassword,
			status: status,
			role: role,
		})

		res.status(201).json({ success: `New user ${username} created!` })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

const deleteUser = async (req, res) => {
	const user = await User.findOne({ _id: req.body.id }).exec()
	if (!user) {
		return res.status(204).json({ message: `User ID ${req.body.id} not found` })
	}
	const result = await user.deleteOne({ _id: req.body.id })
	res.json(result)
}

const getUser = async (req, res) => {
	const user = await User.findOne({ _id: req.params.id }).exec()
	if (!user) {
		return res
			.status(204)
			.json({ message: `User ID ${req.params.id} not found` })
	}
	res.json(user)
}

module.exports = {
	getAllUsers,
	addUser,
	deleteUser,
	getUser,
}
