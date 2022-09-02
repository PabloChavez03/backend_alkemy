const { Character, Movie } = require('../../db.js')

const getCharacters = async (req, res) => {
  try {
    let characters = await Character.findAll({
      include: {
        model: Movie,
        attributes: ["title"]
      }
    })

    if (characters.length === 0) {
      return res.status(200).json({ message: 'Aún no se ha añadido ningún personaje' })
    }

    characters = characters.map(character => {
      return {
        name: character.name,
        image: character.image
      }
    })

    return res.status(200).json(characters)
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
  deleteCharacter
}
