const request = require("postman-request")

const forecast = (latitude, longitude, callback) => {
    const loc_str = latitude + "," + longitude
    console.log(loc_str)
    const fcst_url = "http://api.weatherstack.com/current?access_key=" + process.env.WEATHER_KEY + "&query="  + loc_str + "&units=f"
    request({url: fcst_url, json: true },(error, {body})=>{
        if (error){
            callback("error trying to reach server", undefined)
        } else if (body.error) {
            callback("error while processing data on server", undefined)
        } else {
            const current_obj = body.current
            const {weather_descriptions:wx_desc, feelslike:app_tmp, temperature:amb_tmp, wind_speed:w_sp,
             wind_dir:w_dir, pressure:prs, humidity: humid} = current_obj
            var forecast_str = wx_desc[0] + ". It is currently " + amb_tmp + " degrees out. It feels like " + app_tmp + " degrees out."
            forecast_str = forecast_str + "The wind is " + w_sp + " MPH out of the " + w_dir + ". The humidity is " + humid + "%. The pressure is "  + prs + " mb."
            callback(undefined, forecast_str)
        }
    }
    )
}

module.exports = forecast
