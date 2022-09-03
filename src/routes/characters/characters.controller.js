const { Character, Movie } = require('../../db.js')
const { adapterCharacter } = require('./helpers')

const getCharacters = async (req, res) => {
  const { name, age, movieId } = req.query // queda utilizar age y movies
  try {
    let characters = await Character.findAll({
      include: {
        model: Movie,
        attributes: ["title", "id"]
      }
    })

    if (characters.length === 0) {
      return res.status(200).json({ message: 'Aún no se ha añadido ningún personaje' })
    }

    if (name) {
      let charactersName = characters.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
      if (charactersName.length !== 0) {
        charactersName = adapterCharacter(charactersName)
        return res.status(200).json(charactersName)
      }

      characters = adapterCharacter(characters)

      return res.status(200).json(characters)
    }

    if (age) {
      let charactersAge = characters.filter(el => String(el.year) === age)
      if (charactersAge.length !== 0) {
        charactersAge = adapterCharacter(charactersAge)
        return res.status(200).json(charactersAge)
      }

      characters = adapterCharacter(characters)

      return res.status(200).json(characters)
    }

    if (movieId) {
      let charactersMovie = characters.filter((el) => {
        return el.Movies?.find(el => String(el.id) === movieId)
      }) 
      if (charactersMovie.length !== 0) {
        charactersMovie = adapterCharacter(charactersMovie)
        return res.status(200).json(charactersMovie)
      }

      characters = adapterCharacter(characters)

      return res.status(200).json(characters)
    }

    characters = adapterCharacter(characters)
    return res.status(200).json(characters)

  } catch (error) {
    return res.status(409).json({ message: error.message })
  }
}

const getCharacter = async (req, res) => {
  const { id } = req.params
  try {
    const character = await Character.findByPk(id, {
      include: {
        model: Movie,
        attributes: ["title"]
      }
    })

    if (character) {
      return res.status(200).json(character)
    }

    return res.status(404).json({ message: "No existe el personaje" })
  } catch (error) {
    return res.status(409).json({ message: error.message })
  }
}

const postCharacter = async (req, res) => {
  const { image, name, year, weight, history, movie } = req.body
  try {
    const [character, created] = await Character.findOrCreate({
      where: {
        name,
        image,
        year,
        weight,
        history
      }
    });
    if (movie) {
      const movieInCharacter = await Movie.findAll({
        where: {
          title: movie
        }
      })

      await character.addMovies(movieInCharacter)
    }

    if (created === true) {
      return res.status(201).json({ message: "El personaje fue añadido correctamente" })
    }

    return res.status(200).json({ message: "El personaje ya existe" })

  } catch (error) {
    return res.status(409).json({ message: error.message })
  }
}

const updateCharacter = async (req, res) => {
  const { id } = req.params
  const { image, name, year, weight, history, movie } = req.body

  try {
    const character = await Character.findByPk(id);

    if (movie) {
      const movieForUpdate = await Movie.findOne({
        where: {
          title: movie
        }
      })

      await character.update({
        image,
        name,
        year,
        weight,
        history
      })
      await character.setMovies(movieForUpdate)
      await character.save()
    }

    await character.update({
      image,
      name,
      year,
      weight,
      history
    })
    await character.save()

    return res.status(200).json({ message: "El personaje ha sido actualizado correctamente" })

  } catch (error) {
    return res.status(409).json({ message: error.message })
  }
}

const deleteCharacter = async (req, res) => {
  const { id } = req.params
  try {
    const characterDestroy = await Character.destroy({
      where: {
        id
      }
    })

    if (characterDestroy === 1) {
      return res.status(200).json({ message: "El personaje ha sido eliminado" })
    }

    return res.status(200).json({ message: "El personaje ha sido eliminado previamente" })

  } catch (error) {
    console.log(error)
    return res.status(409).json({ message: error.message })
  }
}

module.exports = {
  getCharacters,
  postCharacter,
  updateCharacter,
  deleteCharacter,
  getCharacter
}
