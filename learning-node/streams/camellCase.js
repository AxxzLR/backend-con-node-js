const { Transform } = require('stream')

const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        this.push(camellCase(chunk.toString()))
        callback()
    }
})

const camellCase = (text) => {
    const first = text.charAt(0).toUpperCase()
    const rest = text.slice(1)
    return first + rest
}

process.stdin
    .pipe(transformStream)
    .pipe(process.stdout)