const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const address = process.argv[2];

geocode(address, (error, data) => {
    if (error) {
        console.log(error)
    } else {
        longitude = data.longitude
        latitude = data.latitude
        forecast({ longitude, latitude }, (error, data) => {
            if (error) {
                console.log(error)
            } else {
                console.log(`The temperature in ${address} is ${data.temperature} ,is fells like ${data.feelslike} and the weather descriptions is ${data.weather_descriptions}`)
            }
        })
    }
})

















// console.log("Starting");
// setTimeout(() => {
//     console.log("1 second out");
// }, 1000)
// setTimeout(() => {
//     console.log("0 second out");
// }, 0)
// setTimeout(() => {
//     console.log("2 second out");
// }, 2000)
// for (let i = 0; i < 1000; i++) {
//     console.log(i);
// }
// console.log("Ending");