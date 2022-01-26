import { Router } from "express";
import UserController from "../../controller/users/users";
import AuthMiddleware from "../../middleware/AuthMiddleware";
import { emailValidation } from "../../middleware/validation";
import User from "../../model/User";

const userRoute = new Router();
userRoute.get(
  "/",
  AuthMiddleware.checkToken,
  AuthMiddleware.checkSuperAdmin,
  UserController.getAllUsers
);
userRoute.get(
  "/user",
  AuthMiddleware.checkToken,
  AuthMiddleware.checkSuperAdmin,
  UserController.getUser
);

userRoute.patch(
  "/user/delete",
  AuthMiddleware.checkToken,
  AuthMiddleware.checkSuperAdmin,
  emailValidation,
  UserController.deleteUser
);
userRoute.patch(
  "/user/activate",
  AuthMiddleware.checkToken,
  AuthMiddleware.checkSuperAdmin,
  emailValidation,
  UserController.activateUser
);

export default userRoute;
