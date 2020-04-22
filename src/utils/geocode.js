const request = require('request');


const geocode = (address, callback) => {
    url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoidml2ZWstOTY4MCIsImEiOiJjazh3dm1lb3owdmQxM2hva2NudHBjemFuIn0.4czqvEXWmtGVV4LiEw_2FQ&limit=1";
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect the server", undefined);
        } else if (body.features.length === 0) {
            callback("Unable to serach Location.Try again next time", undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    })
}


module.exports = geocode;