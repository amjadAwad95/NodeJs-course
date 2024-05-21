const request = require("request")

const forecast = ({ longitude, latitude }, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=2deb5f7be12797b32a95ff5225361aa4&query=" + encodeURIComponent(longitude) + "," + encodeURIComponent(latitude)

    request({ url, json: true }, (error, response) => {
        // console.log(response)
        // const data = JSON.parse(response.body)
        // console.log(data.current)
        // console.log(response.body.current)
        if (error) {
            callback("Unable to connect to  weather", undefined);
        } else if (response.body.error) {
            callback("Unable to find location", undefined);
        } else {
            callback(undefined, {
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike,
                weather_descriptions: response.body.current.weather_descriptions
            })
        }
    })
}

module.exports = forecast