const route = require('express').Router()
const { getMovies, postMovie, updateMovie, deleteMovie, getMovie } = require('./movies.controller')

route.get('/:id', getMovie)
route.get('/', getMovies)
route.post('/', postMovie)
route.patch('/:id', updateMovie)
route.delete('/:id', deleteMovie)
module.exports = route