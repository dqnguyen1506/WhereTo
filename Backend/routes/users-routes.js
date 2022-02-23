const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controller");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();

router.get("/", usersController.getUsers);

router.post(
  "/signup",
  fileUpload.single("image"), //proocess the image file
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(), //Test@test.com => test@test.com
    check("password").isLength({ min: 6 }),
  ],
  usersController.signup
);

router.post("/login", usersController.login);

//export the router object
module.exports = router;
