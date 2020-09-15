const express = require('express')
const app = express()

const { config } = require('./config/index')
const moviesApi = require('./routes/movies')

const { logErrors, wrapErrors, errorHandler } = require('./utils/middleware/errorHandlers')
const notFoundHandler = require('./utils/middleware/notFoundHandler')

//Body Parser
app.use(express.json())

//Routes
moviesApi(app)

//Catch 404
app.use(notFoundHandler)

// Error MiddleWare
//los middleware de manejo de error, siempre deben ir despues del manejo de rutas
app.use(logErrors)
app.use(wrapErrors)
app.use(errorHandler)

app.get('/isLeapYear/:year', function (request, response) {
    const isLeapYear = require('./utils/isLeapYear')
    let msg = ""
    const year = parseInt(request.params.year)
    if (!isNaN(year)) {
        const yearResult = isLeapYear(year)
        msg = yearResult ? "El año es bisiesto" : "El año no es bisiesto"
    }
    else
        msg = "No se recibio un año valido"
    response.send(msg)
})

app.listen(config.port, function () {
    console.log(`Listen on http://localhost:${config.port}`)
})


