const request = require('postman-request');

const forecast = (address, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=9b63582da5dcf856ba7b18bb03602067&query=${address}`

    // const url = `http://api.weatherstack.com/current?access_key=9b63582da5dcf856ba7b18bb03602067&query=${latitude},${longitude}`

    request({ url, json: true }, (error, response) => {

        let { body } = { ...response }

        if (error) {
            callback(`${error}`, undefined)
        } else if (body.error) {
            callback(`Unable to find location, error: ${body.error.info}`, undefined)
        } else {
            // callback(undefined, `Today's weather is ${body.current.weather_descriptions[0]} it is currently ${body.current.temperature} degrees,but it feels like ${response.body.current.feelslike} really.`)
            callback(undefined, body)
        }
    })

}

module.exports = forecast;