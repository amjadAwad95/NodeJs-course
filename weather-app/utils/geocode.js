const request = require("request")

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoib21hcmFua2giLCJhIjoiY2xsNHd3Z21pMGJjbDNlbzZtMmtwMGJpbCJ9.il3OW6ybXOCQ-7Y6yxAjtw&limit=1"

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to app", undefined);
        } else if (response.body.features.length == 0) {
            callback("The location name not found", undefined);
        } else {
            // console.log(request.body.features[0].center)
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }

    })
}

module.exports = geocode