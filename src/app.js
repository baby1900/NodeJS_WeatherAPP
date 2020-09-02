const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths foer Express config
const publicDirectorePath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectorePath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Michael Du'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Michael Du'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText1: 'Hello, please simply follow the navigation bar to view different pages!',
        helpText2: 'Type in your location and we will get the weather for you!',
        title: 'Help',
        name: 'Michael Du'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                address: req.query.address,
                forecast: forecastData,
                location
            })
        })
    })    
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Michael Du',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: 404,
        errorMessage: 'This is the 404 page',
        name: 'Michael Du'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})