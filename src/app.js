const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const routes = require('./routes')

// Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended:false }))

// Routes
app.use('/', routes)

module.exports = app
