const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmFieTE5MDAiLCJhIjoiY2tlZXk0OGszMDY4ZjJycWRkdXV6am5ieCJ9.uSz_LIm4v5BR311xGLIwrA&limit=1'

    request({ url: url, json: true }, (error, {body}) => {
        if (error){
            callback('Unable to connect to weather service.', undefined)
        } else {
            const rspfeature = body.features
            if (rspfeature.length === 0){
                callback('Unable to find location. Please try another search!', undefined)
            } else {
                const rspgeo = rspfeature[0].geometry
                const rsplocation = rspfeature[0].place_name
                const rspposition = rspgeo.coordinates
                const rsplongitude = rspposition[0]
                const rsplatitude = rspposition[1]
                
                callback(undefined, {
                    latitude: rsplatitude,
                    longitude: rsplongitude,
                    location: rsplocation
                })
            }   
        }
    })
}

module.exports = geocode
