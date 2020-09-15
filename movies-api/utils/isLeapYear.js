
const isLeapYear = (year) => {
    const isDivFor4 = year % 4 === 0
    const isDivFor100 = year % 100 === 0
    const isDivFor400 = year % 400 === 0

    //Ejemplificacion de flujo
    // if (isDivFor4) {
    //     if (isDivFor100) {
    //         if(isDivFor400){
    //             return true
    //         }
    //         else{
    //             return false
    //         }
    //     }
    //     else {
    //         return true
    //     }
    // }
    // else {
    //     return false
    // }


    //Reduccion ternaria
    // return isDivFor4 ? isDivFor100 ? isDivFor400 : true : false

    //Reduccion por mapa de karnaugh
    /*
        A=>isDivFor4
        B=>isDivFor100
        C=>isDivFor400
        
        A   B   C   |   S
        0   0   0   |   0   ====Si no es divisible por 4 no es bisiesto
        0   0   1   |   0   ====Si no es divisible por 4 no es bisiesto
        0   1   0   |   0   ====Si no es divisible por 4 no es bisiesto
        0   1   1   |   0   ====Si no es divisible por 4 no es bisiesto
        1   0   0   |   1   ====Si es divisible por 4 y no por 100 es bisiesto (no se necesita validar si es divisible por 400)
        1   0   1   |   1   ====Si es divisible por 4 y no por 100 es bisiesto (no se necesita validar si es divisible por 400)
        1   1   0   |   0   ====Si es divisible por 4 y por 100 pero no por 400 no es bisiesto
        1   1   1   |   1   ====Si es divisible por 4 y por 100 y por 400 es bisiesto

        A\BC         00  01  11  10
                0|    0   0   0   0
                1|    1   1   1   0
        S = AB' + AC
        S = A (B' + C)
    */

    return isDivFor4 && (!isDivFor100 || isDivFor400)
}

module.exports = isLeapYear