const route = require('express').Router()
const { getGenres, deleteGenre } = require('./genres.controller.js')

route.get('/', getGenres)
route.delete('/:id', deleteGenre)

module.exports = route