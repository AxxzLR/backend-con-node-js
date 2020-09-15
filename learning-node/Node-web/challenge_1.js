const http = require('http')
const server = http.createServer()
const PORT = 3000

server.on('request', (req, res) => {
    if (req.method == "POST" && req.url === '/birthday') {
        let body = []
        req
            .on('data', chunk => body.push(chunk))
            .on('end', () => {
                res.writeHead(200, { 'Content-Type': 'text/plain' })
                body = Buffer.concat(body).toString()
                const dia = getWeekDay(body)
                res.end(dia)
            })
    }
    else {
        res.statusCode = 404
        res.end()
    }
})

const getWeekDay = (fecha) => {
    const weekDays_es = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
    try {
        let info = validaFecha(fecha)
        if (!info.hasError) {
            const data = info.data
            let _date = new Date(data[2], data[1] - 1, data[0])
            let dia = _date.getDay()

            let diaSem = weekDays_es[dia - 1]
            return diaSem
        }
        else {
            console.log(info.error)
            return info.error.toString()
        }
    } catch (error) {
        console.log(error)
        return error.toString()
    }
}

const validaFecha = fecha => {
    let ret = { hasError: false, error: new Error, data: [] }
    const minLength = 8, maxLength = 10
    try {
        if (fecha.length >= minLength && fecha.length <= maxLength) {
            let info = fecha.split('/')
            if (info.length === 3) {
                const diaOk = info[0].length >= 1 && info[0].length <= 2 && info[0] >= 1 && info[0] <= 31
                const mesOk = info[1].length >= 1 && info[1].length <= 2 && info[1] >= 1 && info[1] <= 12
                const añoOk = info[2].length === 4 && info[2] > 1000
                if (diaOk && mesOk && añoOk) {
                    ret = {
                        ...ret,
                        data: info
                    }
                }
                else {
                    ret = {
                        ...ret,
                        hasError: true,
                        error: new Error("La fecha no tiene el formato correcto [ Los parametros de fecha no son correctos ] .")
                    }
                }
            }
            else {
                ret = {
                    ...ret,
                    hasError: true,
                    error: new Error("La fecha no tiene el formato correcto  [ no se tiene el numero de parametros de fecha correcto ] .")
                }
            }
        }
        else {
            ret = {
                ...ret,
                hasError: true,
                error: new Error("La fecha no tiene el formato correcto  [ la cadena no tienen el largo necesario ] .")
            }
        }
    }
    catch (error) {
        ret = {
            ...ret,
            hasError: true,
            error
        }
    }
    return ret
}

server.listen(PORT)
console.log(`Servidor en la url http://localhost:${PORT}`)