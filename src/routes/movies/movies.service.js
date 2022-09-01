const route = require('express').Router()
const { getMovies } = require('./movies.controller');

route.get('/', getMovies);

module.exports = route