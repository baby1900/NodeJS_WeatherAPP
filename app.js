const request = require('request')

const url = 'http://api.weatherstack.com/current?access_key=5ad25cbb406878dbc3d3e813bc3b218c&query=37.8267,-122.4233'

request({ url: url, json: true }, (error, response) => {
    if (error){
        console.log('Unable to connect to weather service')
    } else {
        const rspbody = response.body
        const rsperr = rspbody.error
        if (rsperr){
            const errinfo = rsperr.info
            console.log(errinfo)
        } else {
            const currweather = rspbody.current
            const currtemp = currweather.temperature
            const currfeelslike = currweather.feelslike
            
            console.log('It\'s currently ' + currtemp + ' degrees out. It feels like ' + currfeelslike + ' degrees out')
        }
    }

    
})

const geourl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYmFieTE5MDAiLCJhIjoiY2tlZXk0OGszMDY4ZjJycWRkdXV6am5ieCJ9.uSz_LIm4v5BR311xGLIwrA&limit=1'

request({ url: geourl, json: true }, (error, response) => {
    if (error){
        console.log('Unable to connect to weather service')
    } else {
        const rspbody = response.body
        const rspfeature = rspbody.features
        if (rspfeature.length === 0){
            console.log('Unable to find location, please try another search!')
        } else {
            const rspgeo = rspfeature[0].geometry
            const rspposition = rspgeo.coordinates
            const rsplo = rspposition[0]
            const rspla = rspposition[1]
            
            console.log('Lo: ' + rsplo + ' La: ' + rspla)
        }   
    }
})