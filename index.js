const app = require('./src/app.js')
const { conn } = require('./src/db.js')
const { PORT } = process.env

conn
  .sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server conectado al puerto', PORT)
    })
  })