// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/*Dependencies*/
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const port = 8080;
app.listen(port, () => {
    //Callback to debug
    console.log('server running');
    console.log(`runing on localhost: ${port}`)
});


// GET route
app.get('/all', (req, res) => {
    // Callback function to complete GET '/all'
    res.send(projectData);
    console.log(projectData);
});

// POST route
app.post('/add', (req, res) => {
    newEntry = {
        location: req.body.location,
        date: req.body.date,
        temp: req.body.temp,
        icon: req.body.icon,
        description: req.body.description,
        content: req.body.content
    }
    projectData = newEntry
    console.log(projectData)
    res.send(projectData)
});
