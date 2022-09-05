const route = require('express').Router()
const characters = require('./characters/characters.service.js')
const movies = require('./movies/movies.service.js')
const genres = require('./genres/genres.service.js')
const users = require('./users/users.service.js')
const auth = require('../ middleware/auth.js')

route.use('/characters', auth, characters)
route.use('/movies', auth, movies)
route.use('/genres', auth, genres)
route.use('/auth', users)


module.exports = route