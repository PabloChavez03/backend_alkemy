const { User } = require('../../db.js')
const bcrypt = require('bcrypt')

const getUsers = async (req, res) => {
  const users = await User.findAll()
  if(users.length === 0) {
    return res.status(200).json({ message: "Aún no se han registrado usuarios" })
  }

  return res.status(200).json(users)
}

const registerUser = async (req, res) => {
  const { username, password, email } = req.body
  try {
    const saltRam = 10;
    const passwordHash = await bcrypt.hash(password, saltRam);

    const verifyUser = await User.findByPk(username)

    if (!verifyUser) {
      const [user, created] = await User.findOrCreate({
        where: {
          username,
          password: passwordHash,
          email
        }
      })

      if (created === true) {
        return res.status(201).json({ message: "El usuario ha sido registrado correctamente, se ha enviado un correo a su email, verifiquelo porfavor" })
      }
    }

    return res.status(200).json({ message: "El usuario ya ha sido registrado previamente" })
  } catch (error) {
    return res.status(409).json({ message: error.message })
  }
}

module.exports = {
  getUsers,
  registerUser
}