const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  const authorization = req.get("authorization")

  let token = null

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }

  let decodedToken = null;

  try {
    decodedToken = jwt.verify(token, process.env.SECRET_WORD)
  } catch (error) {
    return res.status(401).json({ message: "El token es invalido" })
  }

  if (!token || !decodedToken.username) {
    return res.status(401).json({ message: "El token es invalido o no ha iniciado sesión" })
  }

  next()
}

module.exports = auth