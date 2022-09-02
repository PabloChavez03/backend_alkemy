const adapterCharacter = (characters) => {
  return characters.map(character => {
    return {
      name: character.name,
      image: character.image
    }
  })
}

module.exports = {
  adapterCharacter
}