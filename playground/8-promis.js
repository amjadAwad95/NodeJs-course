// const doWorkCallBack = new Promise((resolve, reject) => {
//     setInterval(() => {
//         //resolve("this work!")
//         reject("ther an error!")
//     }, 2000)
// })
// doWorkCallBack.then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setInterval(() => {
            resolve(a + b)
        }, 2000)
    })
}

add(1, 1).then((sum) => {
    console.log(sum)
    return add(sum, 5)
}).then((sum2) => {
    console.log(sum2)
}).catch((error => {
    console.log(error)
}))

