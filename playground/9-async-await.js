const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setInterval(() => {
            resolve(a + b)
        }, 2000)
    })
}

const doWork = async () => {
    const sum1 = await add(1, 99)
    const sum2 = await add(sum1, 50)
    const sum3 = await add(sum2, 3)
    return sum3
}

doWork().then((resutl) => {
    console.log(resutl)
}).catch((error) => {
    console.log(error)
})