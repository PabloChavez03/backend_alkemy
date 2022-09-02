const route = require('express').Router()
const { getCharacters, postCharacter, updateCharacter, deleteCharacter } = require('./characters.controller.js')

route.get('/', getCharacters)
route.post('/', postCharacter)
route.patch('/:id', updateCharacter)
route.delete('/:id', deleteCharacter)

module.exports = route