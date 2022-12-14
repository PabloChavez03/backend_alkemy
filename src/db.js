require('dotenv').config()
const { Sequelize } = require('sequelize')
const fs = require('node:fs')
const path = require('node:path')
const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME_TEST
} = process.env

// Para no tirar de la base de datos original y tener una de testing
const DB_NAME_CURRENT = process.env.NODE_ENV === 'test'
? DB_NAME_TEST
: DB_NAME

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME_CURRENT}`, {
  logging: false
})

const basename = path.basename(__filename)

const modelDefiners = []

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)))
  })

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize))
// Capitalizamos los nombres de los modelos: user => User
const entries = Object.entries(sequelize.models)
const capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1]
])
sequelize.models = Object.fromEntries(capsEntries)

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { Character,Genre,Movie,User } = sequelize.models

Character.belongsToMany(Movie, { through: 'Rol_Movie', timestamps: false})
Movie.belongsToMany(Character, { through: 'Rol_Movie', timestamps: false})

Movie.belongsToMany(Genre, {through: 'Genre_Movie', timestamps: false})
Genre.belongsToMany(Movie, {through: 'Genre_Movie', timestamps: false})


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Character, User } = require('./db.js');
  conn: sequelize // para importart la conexión { conn } = require('./db.js');
}