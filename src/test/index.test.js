const { conn } = require('../../index.js')
// const moment = require('moment')
const server = require('../app.js')
const { Character, Movie, Genre, User } = require('../db.js')
const { initialCharacters, initialMovies, user } = require('../utils')
const request = require('supertest')(server)
const expect = require('chai').expect

var token;

before(async () => {
  await Character.destroy({
    where: {},
    truncate: {
      cascade: true
    }
  })

  await Movie.destroy({
    where: {},
    truncate: {
      cascade: true
    }
  })

  await User.destroy({
    where: {},
    truncate: {
      cascade: true
    }
  })

  const character1 = await Character.create(initialCharacters[0])
  await character1.save()

  const character2 = await Character.create(initialCharacters[1])
  await character2.save()

  const movie1 = await Movie.create(initialMovies[0])
  await movie1.save()

  const movie2 = await Movie.create(initialMovies[1])
  await movie2.save()
})

describe("Disney API", () => {
  describe('User', () => {
    describe('POST register', () => {
      it('Se espera el registro', async () => {
        const response = await request
          .post('/auth/register')
          .send(user)
          
        expect(response.status).to.eql(201)
      })
    })
    describe('POST login', () => {
      it('Se espera loguearse', async () => {
        const login = {
          username: "admin",
          password: "admin"
        }
        const response = await request
          .post('/auth/login')
          .send(login)

        token = response.body.token
        expect(response.status).to.eql(200)
      })
    })
  })
  
  describe('Characters', () => {
    describe('GET characters', () => {
      it("Se espera que haya personajes", async () => {
        const response = await request
          .get("/characters")
          .set('Authorization', `Bearer ${token}`)

        expect(response.status).to.eql(200)
        expect(response.body).not.length(0)
      })
    })

    /**
     * Como la base de datos se destruye y se vuelve a levantar cada npm test, el id de los personajes va cambiando, ya que se vuelven a construir -esto está definido en el before hook-. Por lo que el id en la ruta no puede ser el mismo.   
     */
    describe('GET character', () => {
      xit('Se espera que obtenga el personaje deseado, sino el personaje no existe', async () => {
        const response = await request
          .get(`/characters/${120}`)
          .set('Authorization', `Bearer ${token}`)

        expect(response.status).to.equal(200)
      })
    })

    describe('POST characters', () => {
      it('Se espera un status de 201, sino hay campos faltantes', async () => {
        const character = {
          name: "Rayo McQueen",
          year: 22,
          history: "Ganar la Copa Piston",
          weight: 32.2,
          image: "un string"
        }

        const response = await request
          .post("/characters")
          .send(character)
          .set('Authorization', `Bearer ${token}`)

        expect(response.status).to.eql(201)
      })
      it('Se espera un status de 201, sino hay tipos de datos incorrectos', async () => {
        const character = {
          name: "Rayo",
          year: 22,
          history: "Ganar la Copa Piston",
          weight: 32.2,
          image: "imagen"
        }
        const response = await request
          .post("/characters")
          .send(character)
          .set('Authorization', `Bearer ${token}`)

        expect(response.status).to.eql(201)
      })
    })
  })

  describe('Movies', () => {
    describe('GET movies', () => {
      it('Se espera que haya peliculas', async () => {
        const response = await request
          .get('/movies')
          .set('Authorization', `Bearer ${token}`)

        expect(response.status).to.eql(200)
        expect(response.body).not.length(0)
      })
    })

    xdescribe('GET movie', () => {
      it('Se espera que se obtenga la pelicula deseada', async () => {
        const response = await request
          .get(`/movies/38`)
          .set('Authorization', `Bearer ${token}`)

        expect(response.status).to.equal(200)
        expect(Object.values(response.body)).not.length(0)
      })
    })

    describe('POST movie', () => {
      it('Se espera un status 201, sino hay campos faltantes', async () => {
        const movie = {
          title: "Red",
          rate: 4.1,
          dateToCreate: "12-03-1997",
          image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/red-1-1647330956.jpg",
        }

        const response = await request
          .post("/movies")
          .send(movie)
          .set('Authorization', `Bearer ${token}`)
          
        expect(response.status).to.equal(201)
      })
    })
  })
})

after(async () => {
  await conn.close()
})