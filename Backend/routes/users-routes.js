const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controller");

const router = express.Router();

router.get("/", usersController.getUsers);

router.post(
  "/signup",
  [
      check("name").not().isEmpty(), 
      check("email").normalizeEmail().isEmail(), //Test@test.com => test@test.com
      check('password').isLength({min: 6})
  ],
  usersController.signup
);

router.post("/login", usersController.login);

//export the router object
module.exports = router;
