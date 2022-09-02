const { Genre,Movie } = require('../../db.js')

const getGenres = async (req,res) => {
  const genres = await Genre.findAll({
    include: {
      model: Movie,
      attributes: ["title"]
    }
  })

  if (genres.length === 0) {
    return res.status(200).json({ message: "Aún no hay generos" })
  }

  return res.status(200).json(genres)
}

module.exports = {
  getGenres
}