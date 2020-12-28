const path = require('path');
const express = require('express');
const hbs = require('hbs')

const app = express();
const port = process.env.PORT || 3000;


//Import weatherStack call
const forecast = require('../utils/forecast');

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')



//Setup handlebars engine and views location
app.set('view engine', '.hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)



//Setup static dir to serve
app.use(express.static(publicDirectoryPath))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Gabriel'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Gabriel'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        help: `There's no help really, sorry.`,
        title: 'Halpp',
        name: 'Gabriel'
    })
})

app.get('/weather', (req, res) => {

    let address = req.query.address

    if (!req.query.address) {
        return res.send({
            error: 'You must enter an address.'
        })
    }
    forecast(address, (error, data) => {
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
        name: 'Gabriel',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Gabriel',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server up and running on port: ' + port)
})