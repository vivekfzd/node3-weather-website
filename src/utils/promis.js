var Promise = require('promise');




delay = (time) => {
    return new Promise((resolve, reject) => {
        if (isNaN(time)) {
            return reject(new Error("This is not a number"))
        } else {
            setTimeout(resolve, time)
        }
    })
}


delayE8 = async (time) => {
    await delay(time)
    return;
}

delayE8(5000)
    .then(() => console.log('hello'))
    .catch(error => console.log(error))

