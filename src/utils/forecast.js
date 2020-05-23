const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=41c9bf991c0a6476c80a23f244aa80d2&' + latitude + ',' + longitude

    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback('unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, body.list[0].weather[0].description + " outside. " + " it is currently " + body.list[0].main.temp + " fahrenheit." + " stay safe. ")
        }
    })
}

module.exports = forecast