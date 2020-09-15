/*
    Lo que se imprime en console.log => se imprime en el stdout
    lo que se imprime en el console.error se imprime en el stderror
 */

 //Util format
 //%s => Cadena
 //%d Numero
 //%j => JSON

 console.log("Un %s y un %s", "perrito", "gatito")

 //Accediendo a la consola de log =>node
//util.format("Un %s y un %s", "perrito", "gatito")

//es un alias de console.log
// console.info("hello world")

//es un alias de console.error
// console.warn("hello world")

//console.assert nos indica cuando una expresion booleana es falsa

// console.assert(42=='42')//no se muestra
// console.assert(42==='42')//indica que fallo la validacion

//Nos indica la linea de codigo donde sucede el mensaje
// console.trace("Hello")


//Este log no aparecera si no se para la variable de entorno

//$ NODE_DEBUG=foo node console-utils.js   

const util = require("util")
const debugglog = util.debuglog("foo")

debugglog("hello from foo")