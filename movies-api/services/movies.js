// const { moviesMock } = require("../utils/mocks/movies") //YA no se usan los mock por que se utilizara mongo

const MongoLib = require("../lib/mongo")

class MoviesService {
    constructor() {
        this.collection = 'movies'
        this.mongoDB = new MongoLib()
    }
    async getMovies({ tags }) {
        const query = tags && { tags: { $in: tags } }
        const movies = await this.mongoDB.getAll(this.collection, query)
        return movies || []
    }

    async getMovie({ movieID }) {
        const movie = await this.mongoDB.get(this.collection, movieID)
        return movie || {}
    }

    async createMovie({ movie }) {
        const createdMovieID = await this.mongoDB.create(this.collection, movie)
        return createdMovieID
    }

    async updateMovie({ movieID, movie } = {}) {
        const updatedMovieID = await this.mongoDB.update(this.collection, movieID, movie)
        return updatedMovieID
    }

    async deleteMovie({ movieID }) {
        const deletedMovieID = await this.mongoDB.delete(this.collection, movieID)
        return deletedMovieID
    }
}

module.exports = MoviesService