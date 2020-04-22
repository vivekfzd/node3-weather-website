const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const fetch = require("node-fetch");

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Vivek kashyap'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Vivek Kashyap'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Vivek Kashyap'
    })
})
/*start*/
app.get('/weather', (req, res) => {
    console.log(req.query.address)
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }
    // let showWeather = '';
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return req.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
            })
        })
    })
})


/*end*/

////////
/*fetch start*/


Util = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    const url2 = await "http://api.weatherstack.com/current?access_key=7b9a8ffe9adba9a3fc84f240ca49585f&query=" + data.features[0].center[1] + "," + data.features[0].center[0] + "&units=m";
    let response2 = await fetch(url2)
    response2 = await response2.json()
    return data;

}
app.get('/weather2', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(req.query.address) + ".json?access_token=pk.eyJ1Ijoidml2ZWstOTY4MCIsImEiOiJjazh3dm1lb3owdmQxM2hva2NudHBjemFuIn0.4czqvEXWmtGVV4LiEw_2FQ&limit=1";
    Util(url).
        then(data => res.send(data)).
        catch(error => res.send(error))
    // fetch(url)
    //     .then(response => response.json())
    //     .then(data => {
    //         const url2 = "http://api.weatherstack.com/current?access_key=7b9a8ffe9adba9a3fc84f240ca49585f&query=" + data.features[0].center[1] + "," + data.features[0].center[0] + "&units=m";
    //         return fetch(url2)
    //     })
    //     .then(response => response.json())
    //     .then(data => res.send(data))
    //     .catch(error => res.send(error))
    //     .catch(error => res.send(error))
})

/*fetch end*/


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})



