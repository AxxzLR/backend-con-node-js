const assert = require('assert')
const proxyquire = require('proxyquire')

const { MoviesServiceMock, moviesMock } = require('../utils/mocks/movies')
const testServer = require('../utils/testServer')

describe('route - console', () => {
    const route = proxyquire('../routes/movies', {
        '../services/movies': MoviesServiceMock
    })

    const request = testServer(route)
    describe('GET /movies', () => {
        it('should respond with status 200', done => {
            request.get('/api/movies').expect(200, done)
        })

        it('should respond with this list of movies', done => {
            request.get('/api/movies').end((err, res) => {
                assert.deepStrictEqual(res.body, {
                    data: moviesMock,
                    message: 'movies listed'
                })

                done()
            })
        })
    })
})