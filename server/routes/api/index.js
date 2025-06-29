// Imports the express router
const router = require('express').Router();
// Imports the vision routes;
const visionRoutes = require('./visionRoutes');

// Sets the routes for user and thoughts
router.use('/vision',visionRoutes);

// Exports the router
module.exports = router;