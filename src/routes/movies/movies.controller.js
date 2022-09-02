const { Movie, Character } = require('../../db.js')

const getMovies = async (req, res) => {
  let movies = await Movie.findAll({
    include: {
      model: Character,
      attributes: ["name"]
    }
  })

  if (movies.length === 0) {
    return res.status(200).json({ message: "Aún no se han agregado peliculas" })
  }

  movies = movies.map(movie => {
    return {
      title: movie.title,
      dateToCreate: movie.day_to_create,
      image: movie.image
    }
  })

  return res.status(200).json(movies)
}

const getMovie = async (req, res) => {
  const { id } = req.params
  try {
    const movie = await Movie.findByPk(id, {
      include: {
        model: Character,
        attributes: ["name"]
      }
    })

    if (movie) {
      return res.status(200).json(movie)
    }
    
    return res.status(404).json({ message: "No existe la pelicula" })
  } catch (error) {
    return res.status(409).json({ message: error.message })
  }
}

const postMovie = async (req, res) => {
  const { title, dateToCreate, rate, image, character } = req.body

  try {
    const [movie, created] = await Movie.findOrCreate({
      where: {
        title,
        day_to_create: dateToCreate,
        rate,
        image
      }
    });

    if (character) {
      const characterInMovie = await Character.findAll({
        where: {
          name: character
        }
      })

      await movie.addCharacters(characterInMovie)
    }

    if (created === true) {
      return res.status(201).json({ message: "La pelicula/serie fue añadida correctamente" })
    }

    return res.status(200).json({ message: "La pelicula ya fue añadida previamente" })

  } catch (error) {
    return res.status(409).json({ message: error.message })
  }

}

const updateMovie = async (req, res) => {
  const { id } = req.params
  const { title, dateToCreate, rate, image, character } = req.body

  try {
    const movie = await Movie.findByPk(id);

    if (character) {
      const characterForUpdate = await Character.findOne({
        where: {
          name: character
        }
      })

      await movie.update({
        title,
        image,
        day_to_create: dateToCreate,
        rate
      })
      await movie.setCharacters(characterForUpdate)
      await movie.save()
    }

    await movie.update({
      title,
      image,
      day_to_create: dateToCreate,
      rate
    })
    await movie.save()

    return res.status(200).json({ message: "La pelicula ha sido actualizado correctamente" })

  } catch (error) {
    return res.status(409).json({ message: error.message })
  }
}

const deleteMovie = async (req, res) => {
  const { id } = req.params
  try {
    const movieDestroy = await Movie.destroy({
      where: {
        id
      }
    })

    if (movieDestroy === 1) {
      return res.status(200).json({ message: "La pelicula ha sido eliminada" })
    }

    return res.status(200).json({ message: "La pelicula ha sido eliminada previamente" })

  } catch (error) {
    console.log(error)
    return res.status(409).json({ message: error.message })
  }
}

module.exports = {
  getMovie,
  getMovies,
  postMovie,
  updateMovie,
  deleteMovie
}