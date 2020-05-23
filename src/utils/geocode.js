const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidXRzYXZiYWdoZWwiLCJhIjoiY2s5dHB4dXhhMDY5ZjNtczFnd3VlcTZycyJ9.9KWTBZq4tqx5XvKKZioneg&limit=5'
    request({
        // shorthand property below
        url,
        json: true
            // destructuring below
    }, (error, {
        body
    }) => {
        if (error) {
            callback('unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('unable to find location try another search', undefined)
        } else {
            callback(undefined, {
                // destructuring below
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })


}


module.exports = geocode