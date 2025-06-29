// Imports express Router
const router = require('express').Router();

// Imports the api routes
const apiRoutes = require('./api');

// Sets the api routes
router.use('/api', apiRoutes);

// Catch all route to send an error message if the request does not match any defined route
router.use((req, res) => res.send('Wrong route!'));

// Exports the router
module.exports = router;