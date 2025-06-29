// Imports express Router
const router = require('express').Router();

// Imports the api routes
const apiRoutes = require('./api');

// Sets the api routes
router.use('/api', apiRoutes);


// Exports the router
module.exports = router;