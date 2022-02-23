const express = require("express");
const { check } = require("express-validator");

const placesController = require("../controllers/places-controller");
const fileUpload = require("../middleware/file-upload");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/:pid", placesController.getPlaceById);

router.get("/user/:uid", placesController.getPlacesByUserId);

//middleware to handle requests without a valid token ==> for protected routes (post/patch) below
router.use(checkAuth);

router.post(
  "/",
  fileUpload.single("image"), //process the file with key: 'image
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
