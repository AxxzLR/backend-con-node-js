const os = require('os')
//Recuperamos la informacion del procesador
// console.log("CPU info", os.cpus())
//Obtenemos la IP
// console.log("IP address", os.networkInterfaces().wifi0.map(x => x.address))
//Obtenemos la información de la memoria libre
// console.log("Free Memory", os.freemem())
//Obtenemos el tipo de SO
// console.log("Type", os.type())
//Obtenemos la version del SO
// console.log("So version", os.release())
//Obtenemos informacion del usuario
console.log("User info", os.userInfo())