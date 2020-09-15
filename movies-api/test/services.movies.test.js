const assert = require('assert')
const proxiquire = require('proxyquire')
const { MongoLibMock, getAllStub } = require('../utils/mocks/mongoLib')
const { moviesMock } = require('../utils/mocks/movies')

describe("services - movies", () => {
    const MoviesServices = proxiquire('../services/movies', {
        '../lib/mongo': MongoLibMock
    })

    const moviesServices = new MoviesServices()

    describe("when getMovies method is called", async () => {
        it('should call the getAll MongoLib method', async () => {
            await moviesServices.getMovies({})
            assert.strictEqual(getAllStub.called, true)
        })

        it('should return an array of movies', async () => {
            const result = await moviesServices.getMovies({})
            const expected = moviesMock
            assert.deepStrictEqual(result, expected)
        })
    })
})