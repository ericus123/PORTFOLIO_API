import { Router } from "express";
import verify from "../middleware/verifyToken";
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
userRoute.get("/getprofile", getprofileController);
export default userRoute;
