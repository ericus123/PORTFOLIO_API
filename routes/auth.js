import { Router } from "express";
const authRoute = new Router();
import { signupValidation, loginValidation } from "../middleware/validation";
import signupController from "../controller/signup";
import loginController from "../controller/login";
//signup route
authRoute.post("/register", signupValidation, signupController);
//login route
authRoute.post("/login", loginValidation, loginController);
export default authRoute;
