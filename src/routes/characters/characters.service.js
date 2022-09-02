const route = require('express').Router()
const { getCharacters, postCharacter, updateCharacter, deleteCharacter, getCharacter } = require('./characters.controller.js')

route.get('/', getCharacters)
route.get('/:id', getCharacter)
route.post('/', postCharacter)
route.patch('/:id', updateCharacter)
route.delete('/:id', deleteCharacter)

module.exports = route