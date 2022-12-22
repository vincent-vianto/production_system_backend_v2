require('dotenv').config()

var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const cors = require('cors')
const Mongoose = require('mongoose')
const env = process.env.NODE_ENV || 'development'
const config = require('./config/config.js')[env]

if (config.database.url) {
	Mongoose.connect(config.database.url, config.database.options)
} else {
	Mongoose.connect(
		`${config.database.protocol}://${config.database.username}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.name}`,
		config.database.options
	)
}

var corsOptions = {
	origin: process.env.NODE_FRONT_END,
	credentials: true,
}
var indexRouter = require('./routes/index')

var app = express()

app.use(cors(corsOptions))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

module.exports = app
