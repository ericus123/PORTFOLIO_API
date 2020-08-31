import { Router } from "express";
import verify from "../middleware/verifyToken";
import corsPolicy from "../middleware/cors";
const userRoute = new Router();

import { updateUserValidation } from "../middleware/validation";
import updateuserController from "../controller/updateUser";
import getusersController from "../controller/getusers";
import getprofileController from "../controller/getprofile";
//get a list of all users
userRoute.get("/getusers", corsPolicy, verify, getusersController);
//update user info route
userRoute.put(
  "/update",
  corsPolicy,
  verify,
  updateUserValidation,
  updateuserController
);

//get profile info
userRoute.get("/getprofile", corsPolicy, verify, getprofileController);
export default userRoute;
