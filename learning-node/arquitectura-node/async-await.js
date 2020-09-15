const promise = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() < 0.5) {
            resolve('Hello World')
        }
        else {
            reject(new Error('Hello Error'))
        }
    }, 2000);
})


const asyncAwait = async () => {
    try {
        const msg = await promise()
        console.log('message', msg)
    } catch (err) {
        console.log('error', err)
    }
}

asyncAwait()