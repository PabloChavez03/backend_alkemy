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

const deleteGenre = async (req,res) => {
  const { id } = req.params
  try {
    const genreDestroy = await Genre.destroy({
      where: {
        id
      }
    })

    if (genreDestroy === 1) {
      return res.status(200).json({ message: "El género ha sido eliminado" })
    }

    return res.status(200).json({ message: "El género ha sido eliminado previamente" })

  } catch (error) {
    console.log(error)
    return res.status(409).json({ message: error.message })
  }
}

module.exports = {
  getGenres,
  deleteGenre
}