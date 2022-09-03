const { Genre, Movie } = require('../../db.js')

const getGenres = async (req, res) => {
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

const postGenre = async (req, res) => {
  const { name, image } = req.body
  try {
    const [genre, created] = await Genre.findOrCreate({
      where: {
        name,
        image
      }
    })


    if (created === true) {
      return res.status(201).json({ message: "El género fue añadido correctamente" })
    }

    return res.status(200).json({ message: "El género ya fue añadido previamente" })

  } catch (error) {

  }
}

const updateGenre = async (req, res) => {
  const { id } = req.params
  const { name, image } = req.body

  try {
    const genre = await Genre.findByPk(id);

    await genre.update({
      name,
      image
    })

    await genre.save()

    return res.status(200).json({ message: "El género ha sido actualizado correctamente" })

  } catch (error) {
    return res.status(409).json({ message: error.message })
  }
}

const deleteGenre = async (req, res) => {
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
  postGenre,
  updateGenre,
  deleteGenre
}