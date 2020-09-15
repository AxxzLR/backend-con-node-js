const fs = require('fs')

//Se utiliza trycatch para el manejo de errores
try {
    //Obtiene del la peticion en terminal os keyword que se introdujeron
    //EJ. node sync-files.js naranja.txt  ==> ["node", "sync-files.js", "naranja.txt"]
    console.log(process.argv)
    //Obtenemos el registro en la posicion 2
    const file = process.argv[2]

    const content = fs.readFileSync(file).toString()
    const lines = content.split("\n").length
    console.log(lines)
} catch (error) {
    console.log(error)
}