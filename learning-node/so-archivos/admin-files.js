const fs = require('fs')
//#region readdir
const files = fs.readdir(__dirname, (err, files) => {
    if (err) {
        console.log(err)
    }
    console.log(files)
})
//#endregion

//#region mkdir
// fs.mkdir("platzi/escuela-js/node", { recursive: true }, err => {
//     if (err)
//         console.log(err)
// })
//#endregion


//#region copy
const copy = "naranja.txt", to = "limon.txt"
fs.copyFile(copy, to, err => {
    if (err)
        return console.log(err)
    console.log(`${copy}, ha sido copiado como ${to}`)
})
//#endregion