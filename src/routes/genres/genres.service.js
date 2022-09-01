const route = require('express').Router()
const { getGenres } = require('./genres.controller.js')

route.get('/', getGenres);

module.exports = route