const route = require('express').Router()
const { getUsers, registerUser, loginUser } = require('./users.controller.js')

route.get('/', getUsers)
route.post('/register', registerUser)
route.post('/login', loginUser)

module.exports = route