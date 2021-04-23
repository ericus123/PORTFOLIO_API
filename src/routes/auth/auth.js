import { Router } from "express";
const authRoute = new Router();
import {
  userValidation,
  loginValidation,
  PassResetValidation,
} from "../../middleware/validation";
import AuthController from "../../controller/auth/auth";
import AuthMiddleware from "../../middleware/AuthMiddleware";
import NewsLetterMiddleware from "../../middleware/subscriptions/newsLetter";

authRoute.post("/register", userValidation, AuthController.Signup);
authRoute.post("/login", loginValidation, AuthController.Login);
authRoute.get(
  "/check-login",
  AuthMiddleware.checkToken,
  AuthController.CheckLogin
);
authRoute.put(
  "/verify/:email/:token",
  NewsLetterMiddleware.checkEmail,
  AuthMiddleware.isNotVerified,
  AuthController.ConfEmail
);
authRoute.post(
  "/confirmation/resend/:email",
  NewsLetterMiddleware.checkEmail,
  AuthMiddleware.isNotVerified,
  AuthController.ResendConfEmail
);
authRoute.post(
  "/password/resetlink",
  NewsLetterMiddleware.checkEmail,
  AuthMiddleware.isVerified,
  AuthController.SendPassResetLink
);
authRoute.put(
  "/password/reset/:email/:token",
  NewsLetterMiddleware.checkEmail,
  AuthMiddleware.isVerified,
  PassResetValidation,
  AuthController.ResetPassword
);
export default authRoute;
