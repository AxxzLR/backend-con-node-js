const eventEmitter = require('events')

class Logger extends eventEmitter {
    async execute(cb) {
        console.log('Before')
        this.emit('start')
        await cb()
        this.emit('finish')
        console.log('After')
    }
}

const logger = new Logger()

logger.on('start', () => console.log('Starting'))
logger.on('finish', () => console.log('Finishing'))
logger.on('finish', () => console.log('It\'s done!'))

// logger.execute(()=> console.log('Hello World'))
logger.execute(() => setTimeout(() => { console.log('Hello World') }, 2000))
