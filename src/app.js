const path = require("path")
const express = require("express")
const hbs = require("hbs")
const dotenv = require('dotenv')

const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
//const { hasSubscribers } = require("diagnostics_channel")

const port = process.env.PORT || 3000
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// setup handlebars engine and views location 
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

dotenv.config() 

app.get("", (req, res) => {
    res.render("index", {
        "title":"Weather",
        "name":"Jeanne Lane"})
})

app.get("/about", (req, res) => {
    res.render("about",{
        title:"About Me",
         name: "Jeanne Lane"} )
}
)

app.get("/help", (req,res) => {
    res.render("help", {
        message: "This is the dynamic help message",
        title: "Help",
        name: "Jeanne Lane"
    })
})

//if body is undefined, the destructing would throw an error because it is trying to destructure undefined.
// TypeError: Cannot destructure property 'label' of 'undefined' as it is undefined.    
//geocode body would pass undefined to {latitude, longitude, location}
//fix with {latitude, longitude, location} = {}, if body undefined, don't destrucure undefined, pass undefined to the variables
app.get("/weather", (req,res) => {
    if (!req.query.address){
        return res.send({error:"You must provide an address!"})
    } else {
        var address = req.query.address
        geocode(address, (error, {latitude, longitude, location} ={} ) =>{
            if (error) { 
                console.log(error)
                return res.send({error})
            } else {
                forecast(latitude, longitude, (error, fcstData) => {
                    if (error) {
                        return res.send({error})
                    } else {
                        return res.send({forecast: fcstData,
                            location,
                            address })
                    }
                }
                
                )
            }

            
        })
    }
    
    
})

//#can not set headers after they are sent to the client means you are sending two responses
app.get("/products", (req,res) => {
    if (!req.query.search) {
        return res.send({error:"You must provide a search term"})
    }
    console.log(req.query.search)
    res.send({products:[]})
})
app.get("/help/*", (req, res) => {
    res.render("404",{title: "Help page not found",
    errorMessage:"Help article not found",
    name: "Jeanne Lane"})
})

app.get("*", (req, res) => {
    res.render("404",{title: "404",
    errorMessage:"Page not found.",
    name: "Jeanne Lane"})
})


app.listen(port, () => {
    console.log("Server is up on port " + port + ".")
})