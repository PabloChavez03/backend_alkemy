const route = require('express').Router()
const { getCharacters } = require('./characters.controller.js')

route.get('/', getCharacters);

module.exports = route