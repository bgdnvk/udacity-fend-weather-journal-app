// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require("body-parser");

const cors = require ("cors");
app.use(cors());

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;

function listening (){
    console.log("server up @ localhost: "+port);
}
//server listening
const server = app.listen(port, listening);

//server GET
function getData(req, res){
    res.send(projectData);
    console.log(projectData);
}
//GET
app.get("/all",getData);



//server POST
function addData(req, res){

    newWeatherData = {
        date: req.body.date,
        zip: req.body.zip,
        temperature: req.body.temp,
        content: req.body.feelings
    }

    //from MDN:
    //https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/object/assign
    Object.assign(projectData, newWeatherData);
}
//POST
app.post("/addWeather", addData);