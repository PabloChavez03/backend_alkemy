const getGenres = (req,res) => {
  res.status(200).json({ message: 'Hola desde genres' })
}

module.exports = {
  getGenres
}