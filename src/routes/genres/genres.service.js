const route = require('express').Router()
const { getGenres, deleteGenre, postGenre, updateGenre } = require('./genres.controller.js')

route.get('/', getGenres)
route.post('/', postGenre)
route.patch('/:id', updateGenre)
route.delete('/:id', deleteGenre)

module.exports = route