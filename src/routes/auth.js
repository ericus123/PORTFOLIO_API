import { Router } from "express";
const authRoute = new Router();
import { signupValidation, loginValidation } from "../middleware/validation";
import checkemailExistence from '../middleware/checkEmail'
import signupController from "../controller/signup";
import loginController from "../controller/login";
//signup route
authRoute.post("/register", signupValidation ,checkemailExistence, signupController);
//login route
authRoute.post("/login", loginValidation, loginController);
authRoute.post("/verifyAccount/:verifyToken", loginValidation, loginController);
export default authRoute;
