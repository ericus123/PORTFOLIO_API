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
import passport from "passport";

authRoute.post("/register", userValidation, AuthController.Signup);
authRoute.post("/login", loginValidation, AuthController.Login);
authRoute.post("/login-admin", loginValidation, AuthController.LoginAsAdmin);
authRoute.get(
  "/check-login",
  AuthMiddleware.checkToken,
  AuthController.CheckLogin
);
authRoute.put(
  "/verify/:email/:token",
  AuthMiddleware.checkAccessToken,
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
authRoute.patch(
  "/password/change",
  AuthMiddleware.checkToken,
  PassResetValidation,
  AuthController.changePassword
);
authRoute.put(
  "/password/reset/user/:token",
  AuthMiddleware.checkAccessToken,
  PassResetValidation,
  AuthController.ResetPassword
);

authRoute.post(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
    accessType: "offline",
    approvalPrompt: "force",
  })
);

// callback url upon successful google authentication
authRoute.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    failureFlash: true,
    successFlash: "Successfully logged in!",
  }),
  (req, res) => {
    console.log("LOGGED IN");
    return res.status(200).json({ msg: "Signed in successfully" });
  }
);
authRoute.post("/google/login", AuthController.GoogleAuth);
export default authRoute;
