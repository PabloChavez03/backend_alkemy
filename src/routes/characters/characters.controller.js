const getCharacters = (req,res) => {
  res.status(200).json({ message: 'Hola desde personajes' })
}

module.exports = {
  getCharacters
}