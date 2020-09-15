//Node trabaja bajo arquitectura orientada a eventos

const asyncCallback = cb => {
    setTimeout(() => {
        if (Math.random() < 0.5) {
            cb(null, 'Hello World')
        }
        else {
            cb(new Error('Hello Error'))
        }
    }, 2000);
}

asyncCallback((err, msg) => {
    if (err)
        console.log('Error', err)
    else
        console.log('message', msg)
})