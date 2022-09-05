const { conn } = require('../../index.js')
const server = require('../app.js')
const { Character, Movie, Genre } = require('../db.js')
const { initialCharacters } = require('../utils')
const request = require('supertest')(server)
const expect = require('chai').expect

before(async () => {
  await Character.destroy({
    where: {},
    truncate: {
      cascade: true
    }
  })

  const character1 = await Character.create(initialCharacters[0])
  await character1.save()

  const character2 = await Character.create(initialCharacters[1])
  await character2.save()
})

describe("Disney API", () => {
  describe('Characters', () => {
    describe('GET characters', () => {
      it("Hay personajes", async () => {
        const response = await request.get("/characters")
        expect(response.status).to.eql(200)
      })
      it("Hay más de un personaje en db", async () => {
        const response = await request.get("/characters")
        expect(response.body).length(2)
      })
    })

    describe('POST characters', () => {
      it('the status is expected to be 201, otherwise there are missing fields to fill in', async () => {
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

        expect(response.status).to.eql(201)
      })
      it('Formato inválido del personaje en la solicitud POST', async () => {// POR TERMINAR
        const character = {
          name: 123,
          year: 22,
          history: "Ganar la Copa Piston",
          weight: 32.2,
          image: 123
        }
        const response = await request
          .post("/characters")
          .send(character)

        // expect(response.body.weight)
      })
    })
  })
})

after(async () => {
  await conn.close()
})