const fs = require('fs')
const util = require("util")

const out = fs.createWriteStream("./out.log")
const err = fs.createWriteStream("./err.log")
const customConsole = new console.Console(out, err)
const debugglog = util.debuglog("foo")

const getTime = () => {
    const time = new Date()
    return `${time.getDate()}/${time.getMonth()}/${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}.${time.getMilliseconds()}`
}

customConsole.logger = ({ txt, format, emoji, showTime, hiddeLog, isError, isDebug }) => {
    const time = `${getTime()} ==> `
    const txtLog = `\x1b${format + (showTime ? time : "") + emoji}  ${txt}  \x1b[0m`
    const txtCustomLog = `${time + emoji}  ${txt}`
    if (!hiddeLog) {
        if (isDebug)
            debugglog(txtLog)
        else {
            if (isError)
                console.error(txtLog)
            else
                console.log(txtLog)
        }
    }

    if (isError)
        customConsole.error(txtCustomLog)
    else
        customConsole.log(txtCustomLog)
}
customConsole.print = (txt, showTime, hiddeLog) => {
    const objLog = { txt, format: '[44m', emoji: '👉', showTime, hiddeLog }
    customConsole.logger(objLog)
}
customConsole.err = (txt, showTime, hiddeLog) => {
    const objLog = { txt, format: '[31m', emoji: '😈', showTime, hiddeLog, isError: true }
    customConsole.logger(objLog)
}
customConsole.warning = (txt, showTime, hiddeLog) => {
    const objLog = { txt, format: '[33m', emoji: '😱', showTime, hiddeLog, isError: true }
    customConsole.logger(objLog)
}
customConsole.information = (txt, showTime, hiddeLog) => {
    const objLog = { txt, format: '[34m', emoji: '💭', showTime, hiddeLog }
    customConsole.logger(objLog)
}
customConsole.love = (txt, showTime, hiddeLog) => {
    const objLog = { txt, format: '[45m', emoji: '💙', showTime, hiddeLog }
    customConsole.logger(objLog)
}
customConsole.lucky = (txt, showTime, hiddeLog) => {
    const objLog = { txt, format: '[42m', emoji: '🍀', showTime, hiddeLog }
    customConsole.logger(objLog)
}
customConsole.wtf = (txt, showTime, hiddeLog) => {
    const objLog = { txt, format: '[40m', emoji: '💩', showTime, hiddeLog, isError: true }
    customConsole.logger(objLog)
}
customConsole.debug = (txt, showTime, hiddeLog) => {
    const objLog = { txt, format: '[40m', emoji: '🐞', showTime, hiddeLog, isDebug: true }
    customConsole.logger(objLog)
}

customConsole.print("Esta es una linea simple", true)
customConsole.err("Esto es una linea de error")
customConsole.warning("Esto es una linea de advertencia")
customConsole.information("Esta es una linea de información")
customConsole.love("El programa hizo algo grandioso", true)
customConsole.lucky("El programa compilo a la primera")
customConsole.wtf("¿Qué carajo paso?")

customConsole.debug("Estoy arreglando un bug")