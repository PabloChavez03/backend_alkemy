const route = require('express').Router()
const { getMovies, postMovie, updateMovie, deleteMovie, getMovie } = require('./movies.controller')
const auth = require('../../ middleware/auth.js')

route.get('/:id', /*auth,*/ getMovie)
route.get('/', getMovies)
route.post('/', postMovie)
route.patch('/:id', updateMovie)
route.delete('/:id', deleteMovie)
module.exports = route