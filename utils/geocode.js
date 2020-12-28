const request = require('postman-request');

const geocode = (address, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?types=address&access_token=pk.eyJ1IjoiZ2FiMTk5MSIsImEiOiJja2lkamJjM2EwMzIwMndxdzdiYWw1cnB0In0.QvN_fftT-c6OQuGJwKqVzw&limit=1`

    request({ url, json: true }, (error, response) => {

        let { body } = {...response}

        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback(`Sorry, we couldn't find that location for you.`, undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;