const { json } = require("body-parser");
const express = require("express");

const placesController = require('../controllers/places-controller');

const router = express.Router();

router.get("/:pid", placesController.getPlaceById);

router.get("/user/:uid", placesController.getPlaceByUserId)

router.post('/', placesController.createPlace);

//export the router object
module.exports = router;
