const express = require('express');
const path = require('path');

// Creates an absolute path to the.env file in the project root
const envPath = path.resolve(__dirname, '..', '.env');
// Tells dotenv to load the file from that specific path
require('dotenv').config({ path: envPath });

const routes = require('./routes');

//Creates a new instance of express
const app = express();
//Defines the port to be used if no port is provided by the enviroment
const PORT = process.env.PORT || 3001;

// Middleware to parse the url encoded or json  requests
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

//Set up the routes
app.use(routes);


// Start the server
app.listen(PORT, () =>
    console.log(`🌎  ==> Server now listening on PORT ${PORT}!`),
);