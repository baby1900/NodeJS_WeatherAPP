const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5ad25cbb406878dbc3d3e813bc3b218c&query=' + latitude + ',' + longitude
    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to weather service', undefined)
        } else {
            const rsperr = body.error
            if (rsperr){
                callback('Unable to find location. Please try again!', undefined)
            } else {
                const currweather = body.current
                const currweatherdata = currweather.weather_descriptions 
                const currtemp = currweather.temperature
                const currfeelslike = currweather.feelslike
                callback(undefined, 'It\'s currently ' + currweatherdata + ' out. It\'s currently ' + currtemp + ' degrees out. It feels like ' + currfeelslike + ' degrees out')
            }
        }    
    })
}

module.exports = forecast
