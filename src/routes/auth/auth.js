import { Router } from "express";
const authRoute = new Router();
import {
  userValidation,
  loginValidation,
  PassResetEmailValidation,
  PassResetValidation,
} from "../../middleware/validation";
import AuthController from "../../controller/auth/auth";
import AuthMiddleware from "../../middleware/AuthMiddleware";

authRoute.post("/register", userValidation, AuthController.Signup);
authRoute.post("/login", loginValidation, AuthController.Login);
authRoute.post(
  "/check-login",
  AuthMiddleware.checkToken,
  AuthController.CheckLogin
);
authRoute.put(
  "/verify/:id/:token",
  AuthMiddleware.isNotVerified,
  AuthController.ConfEmail
);
authRoute.post(
  "/confirmation/resend/:id",
  AuthMiddleware.isNotVerified,
  AuthController.ResendConfEmail
);
authRoute.post(
  "/password/resetlink",
  PassResetEmailValidation,
  AuthController.SendPassResetLink
);
authRoute.put(
  "/password/reset/:id/:token",
  PassResetValidation,
  AuthController.ResetPassword
);
export default authRoute;
