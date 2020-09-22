const express = require('express')
// const { moviesMock } = require('../utils/mocks/movies') //Se elimina por que se consumira desde la capa de servicios
const MoviesService = require("../services/movies")
const validationHandler = require('../utils/middleware/validationHandler')
const { movieIDSchema, createMovieSchema, updateMovieSchema } = require('../utils/middleware/schemas/movies')

const cacheResponse = require('../utils/cacheResponse')
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../utils/time')

function moviesApi(app) {
    const router = express.Router()
    app.use("/api/movies", router)

    const moviesService = new MoviesService()

    router.get("/", async function (req, res, next) {
        try {
            cacheResponse(res, FIVE_MINUTES_IN_SECONDS)
            const { tags } = req.query //Recupera los parametros del querystring (?Hello=World) como un objeto
            const movies = await moviesService.getMovies({ tags })

            // throw new Error('error getting movies')

            res
                .status(200)
                .json({
                    data: movies,
                    message: 'movies listed'
                })
        } catch (error) {
            next(error)
        }
    })

    router.get("/:movieID", validationHandler({ movieID: movieIDSchema }, 'params'), async function (req, res, next) {
        try {
            cacheResponse(res, SIXTY_MINUTES_IN_SECONDS)
            const { movieID } = req.params
            const movie = await moviesService.getMovie({ movieID })
            res
                .status(200)
                .json({
                    data: movie,
                    message: 'movie retrived'
                })
        } catch (error) {
            next(error)
        }
    })

    router.post("/", validationHandler(createMovieSchema), async function (req, res, next) {
        try {
            const { body: movie } = req
            const createdMovieID = await moviesService.createMovie({ movie })
            res
                .status(201)
                .json({
                    data: createdMovieID,
                    message: 'movie created'
                })
        } catch (error) {
            next(error)
        }
    })

    router.put("/:movieID", validationHandler({ movieID: movieIDSchema }, 'params'), validationHandler(updateMovieSchema), async function (req, res, next) {
        try {
            const { body: movie } = req
            const { movieID } = req.params
            const updatedMovieID = await moviesService.updateMovie({ movieID, movie })
            res
                .status(200)
                .json({
                    data: updatedMovieID,
                    message: 'movie updated'
                })
        } catch (error) {
            next(error)
        }
    })

    router.delete("/:movieID", validationHandler({ movieID: movieIDSchema }, 'params'), async function (req, res, next) {
        try {
            const { movieID } = req.params
            const deletedMovieID = await moviesService.deleteMovie({ movieID })
            res
                .status(200)
                .json({
                    data: deletedMovieID,
                    message: 'movie deleted'
                })
        } catch (error) {
            next(error)
        }
    })
}

module.exports = moviesApi