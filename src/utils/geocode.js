const request = require("postman-request")



const geocode = (address, callback) => {
    const map_url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=" + process.env.GEO_TOKEN
    //destructured response object
    request({url:map_url, json:true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to mapbox.", undefined)
        } else if (body.error){
            callback("Error while processing on server.", undefined)
        } else {
                const data = body.features
                if (data.length > 0) {
                    const coords = data[0].center
                    const lat = coords[1]
                    const lon = coords[0]
                    const name = data[0].place_name
                    console.log(name)
                    callback(undefined, {
                        latitude: lat,
                        longitude: lon,
                        location: name
                    } )
                } else {
                    console.log("Feature array empty--bad location")
                    callback(" Unable to find location. Check search string.", undefined)
                }
        }

    })
}

module.exports = geocode