const route = require('express').Router()
const { getMovies, postMovie, updateMovie } = require('./movies.controller')

route.get('/', getMovies)
route.post('/', postMovie)
route.patch('/:id', updateMovie)

module.exports = route