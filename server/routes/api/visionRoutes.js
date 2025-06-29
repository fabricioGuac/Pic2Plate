// Imports the express router, multer and the generate recicpe controller
const router = require('express').Router();
const multer = require('multer');
const {generateRecipes} = require("../../controllers/visionController");

// Use memory storage so files aren't saved to disk
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Post route to generae the recipes of the given image
router.post('/', upload.single('image'), generateRecipes);

module.exports = router;