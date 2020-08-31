import { Router } from "express";
import verify from "../middleware/verifyToken";

userRoute.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
const userRoute = new Router();

import { updateUserValidation } from "../middleware/validation";
import updateuserController from "../controller/updateUser";
import getusersController from "../controller/getusers";
import getprofileController from "../controller/getprofile";
//get a list of all users
userRoute.get("/getusers", verify, getusersController);
//update user info route
userRoute.put("/update", verify, updateUserValidation, updateuserController);

//get profile info
userRoute.get("/getprofile", verify, getprofileController);
export default userRoute;
