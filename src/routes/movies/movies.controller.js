const getMovies = (req,res) => {
  res.status(200).json({ message: 'Hola desde peliculas' })
}

module.exports = {
  getMovies
}