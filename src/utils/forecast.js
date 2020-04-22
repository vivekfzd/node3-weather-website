const request = require('request');


forecast = (latitude, logitude, callback) => {
    url = "http://api.weatherstack.com/current?access_key=7b9a8ffe9adba9a3fc84f240ca49585f&query=" + latitude + "," + logitude + "&units=m"
    // console.log(url);
    request({ url: url, json: true }, (error, response) => {
        //console.log(response);
        if (error) {
            callback("Unable to connect the server", undefined);
        } else if (response.body.error) {
            callback("Unable to serach Location.Try again next time", undefined);
        } else {
            callback(undefined, (`${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degree out. There is ${response.body.current.feelslike} chance of rain.${response.body.location.name}`))
        }
    })

}

module.exports = forecast;
