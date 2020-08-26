const router = require("express").Router();
const verify = require("../middleware/verifyToken");
const User = require("../model/User");

const {
  signupValidation,
  loginValidation,
} = require("../middleware/validation");
const signupController = require("../controller/signup");
const loginController = require("../controller/login");
//signup route
router.post("/register", signupValidation, signupController);
//login route
router.post("/login", loginValidation, loginController);
module.exports = router;
