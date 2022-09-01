const route = require('express').Router()
const characters = require('./characters/characters.service.js')
const movies = require('./movies/movies.service.js')
const genres = require('./genres/genres.service.js')

route.use('/characters', characters)
route.use('/movies', movies)
route.use('/genres', genres)


module.exports = route