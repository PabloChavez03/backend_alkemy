const { Movie, Character, Genre } = require('../../db.js')
const { adapterMovie } = require('./helpers')
const moment = require('moment')

const getMovies = async (req, res) => {
  const { name, genre, order } = req.query

  let movies = await Movie.findAll({
    include: [
      {
        model: Character,
        attributes: ["name"]
      },
      {
        model: Genre,
        attributes: ["name", "id"]
      }
    ]
  })

  if (movies.length === 0) {
    return res.status(200).json({ message: "Aún no se han agregado peliculas" })
  }

  if (name) {
    let movieName = movies.filter(el => el.title.toLowerCase().includes(name.toLowerCase()))
    if (movieName.length !== 0) {
      movieName = adapterMovie(movieName)
      return res.status(200).json(movieName)
    }
  }

  if (genre) {
    let movieGenre = movies.filter(el => {
      return el.Genres?.find(el => String(el.id) === genre)
    })
    if (movieGenre.length !== 0) {
      movieGenre = adapterMovie(movieGenre)
      return res.status(200).json(movieGenre)
    }

    movies = adapterMovie(movies)

    return res.status(200).json(movies)
  }

  if (order) {
    if (order === "ASC") {
      let movieOrder = movies.sort((a, b) => {
        return a.day_to_create - b.day_to_create
      })
      movieOrder = adapterMovie(movieOrder)
      return res.status(200).json(movieOrder)
    }

    if (order === "DESC") {
      let movieOrder = movies.sort((a, b) => {
        return b.day_to_create - a.day_to_create
      })
      movieOrder = adapterMovie(movieOrder)
      return res.status(200).json(movieOrder)
    }

    movies = adapterMovie(movies)

    return res.status(200).json(movies)
  }

  movies = adapterMovie(movies)

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
  const { title, dateToCreate, rate, image, character, genre } = req.body

  try {
    const [movie, created] = await Movie.findOrCreate({
      where: {
        title,
        day_to_create: moment(dateToCreate,"MM-DD-YYYY"),
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

    if (genre) {
      if (Array.isArray(genre)) {
        genre.forEach(async (el) => {
          await Genre.findOrCreate({
            where: {
              name: el
            }
          })
        })

        let genreInMovie = await Genre.findAll({
          where: {
            name: genre
          }
        })

        await movie.setGenres(genreInMovie)
        await movie.save()
      }
      let [genreInMovie] = await Genre.findOrCreate({
        where: {
          name: genre
        }
      })

      await movie.addGenres(genreInMovie)
      await movie.save()
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