const jwt = require('jsonwebtoken')
const { User } = require('../db.js')

const auth = async (req,res,next) => {
  const authorization = req.get("authorization");
}