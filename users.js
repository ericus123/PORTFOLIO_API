const router = require("express").Router();
const verify = require("../middleware/verifyToken");
const User = require("../model/User");

const { updateUserValidation } = require("../middleware/validation");
const updateuserController = require("../controller/updateUser");
const getusersController = require("../controller/getusers");
//get a list of all users
router.get("/getusers", verify, getusersController);
//update user info route
router.put("/update/:id", verify, updateUserValidation, updateuserController);
module.exports = router;
