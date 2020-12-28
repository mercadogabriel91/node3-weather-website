const path = require('path');
const express = require('express');
const hbs = require('hbs')

const app = express();

//Import weatherStack call
const forecast = require('../utils/forecast');
const { response } = require('express');


//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')



//Setup handlebars engine and views location
app.set('view engine', '.hbs');
// app.set('views', '../views')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)



//Setup static dir to serve
app.use(express.static(publicDirectoryPath))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mazzuccio'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Mazzuccio'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        help: `ohhhhh pero q lassssss`,
        title: 'Halpp',
        name: 'Mazzuccio'
    })
})

app.get('/weather', (req, res) => {

    let address = req.query.address

    if (!req.query.address) {
        return res.send({
            error: 'You must enter an address.'
        })
    } 
    forecast(address, (error, data) =>{
        if (error) {
            return res.send({ error })
        } 

        res.send({
            forecast: data
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mazzuccio',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mazzuccio',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server up and running on port :3000')
})