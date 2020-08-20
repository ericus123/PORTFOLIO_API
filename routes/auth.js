const router = require("express").Router();
const verify = require("../middleware/verifyToken");
const User = require("../model/User");

const {
  signupValidation,
  loginValidation,
  updateUserValidation,
} = require("../middleware/validation");
const signupController = require("../controller/signup");
const loginController = require("../controller/login");
const updateuserController = require("../controller/updateUser");
//signup route
router.post("/register", signupValidation, signupController);

//update user info route
router.put("/update/:id", verify, updateUserValidation, updateuserController);

//login route
router.post("/login", loginValidation, loginController);
module.exports = router;
