const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
    //
    // goal: create a partials for the footer
    //
    // 1.) setup the template for the footer partial "created by some name"
    // 2.) render the partial at the bottom of all three pages
    // 3.) test your work by visiting all three pages

//console.log(__dirname);
//console.log(path.join(__dirname, "../public"));

const app = express();

//define paths for express config

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// above we have created publicDirectoryPath to join public directory into this file

// app.get this configures what the server should do when someone tries to get the resource at a specific url.
// what should we send back if user search for something
// short form of request and response below.

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: " weather ",
        name: "utsav krishna baghel",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me ",
        name: "utsav krishna baghel",
    });
});

//
//goal create a template for help page
//
//1.) setup a help template to render a help message to the screen
//2.) setup the help route and render the template with an example message
//3.) visit the route in the browser and see your help message print

app.get("/help", (req, res) => {
    res.render("help", {
        title: "help ",
        name: "utsav krishna baghel",
    });
});

// below app.get will not work after  combining public path after that we will type in the browser localhost:3000/index.html

// app.get("", (req, res) => {
//     res.send("<h1>weather</h1>");
// });

//
// goal 3
//
// 1.) create a html page for about with "about" title
// 2.) create a html page for help with "help" title
// 3.) remove the old route handlers for both
// 4.) visit both in the browser to test your work

// app.get("/help", (req, res) => {
//     res.send([{
//             name: "utsav",
//         },
//         {
//             name: "krishna",
//         },
//     ]);
// });

//
// goal
//
// 1.) setup an about route and render a page title
// 2.) setup a weather route and render a page title
// 3.) test your work by visiting both in the browser

//
// goal 2
//
//  1.) setup about route to render a title with html
//  2.) setup a weather route to send back json
//  - object with forecast and location strings
//  3.) test your work by visiting both in the browser

// app.get("/about", (req, res) => {
//     res.send("<body>my first express </body>");
// });

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }


    geocode(req.query.address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })


        })
    })



    // res.send({

    //     location: "new delhi",
    //     forecast: "sunny weather",
    //     address: req.query.address
    // });
});

//
//
// goal: wire up/weather
//
// 1. require the geocode/forecast into app.js
// 2. use the address to geocode
// 3. use the coordinates to get forecast
// 4. send back the real forecast and location






















//
//
// goal: update weather endpoint to accept address 
//
// 1. no address? send back an error message 
// 2. address? send back the static JSON 
// -add address property onto json which returns the provided address 
// 3.  test /weather and weather?address=new delhi





app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})



//
// we can send json,arrays,html formats listed above

// above function stores the url in '' and what should it return as a result.

// app.com
// app.com/help
// app.com/about

// below starting the server

// app.listen start up the server

//
//for 404 page

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "utsav krishna baghel",
        errorMessage: "help article not found",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "utsav krishna baghel",
        errorMessage: "page not found",
    });
});

//
// goal: create and render a 404 page with handlebars
//
// 1. setup the template to render the header and the footer
// 2. setup the template to render an error message in a paragraph
// 3. render the template for both 404 routes
//      -------page not found
//     --------help article not found
// 4. test your work,visit /what and /help/units

app.listen(3000, () => {
    console.log("server is up on the port 3000");
});

// we can start up the server by just using node.
// ctrl+c for stopping