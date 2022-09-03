const route = require('express').Router()
const { getUsers, registerUser } = require('./users.controller.js')

route.get('/', getUsers)
route.post('/register', registerUser)

module.exports = route