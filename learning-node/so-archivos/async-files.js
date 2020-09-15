const fs = require('fs')

console.log(process.argv)
const file = process.argv[2]


if (!file) {
    console.log("No se especifico archivo")
}
else {
    //no se especifica que es asincrono (por defecto lo es)
    //Se utiliza error first callback como manejo de errores.
    const content = fs.readFile(file, (err, content) => {
        if (err) {
            return console.log(err)
        }
        //Se utiliza toString ya que el metodo asyncrono devuelve el content como un buffer
        const lines = content.toString().split("\n").length
        console.log(lines)
    })
}
