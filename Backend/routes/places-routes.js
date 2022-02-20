const express = require("express");

const { check } = require("express-validator");

const placesController = require("../controllers/places-controller");

const router = express.Router();

router.get("/:pid", placesController.getPlaceById);

router.get("/user/:uid", placesController.getPlacesByUserId);

router.post(
  "/",
  //validators
  [
    check("title").not().isEmpty(), //check title not empty
    check("description").isLength({ min: 5 }), //check description min length
    check("address").not().isEmpty(), //check address not empty
  ],
  placesController.createPlace
);

router.patch(
  "/:pid",
  //validators
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placesController.updatePlace
);

router.delete("/:pid", placesController.deletePlace);

//export the router object
module.exports = router;
