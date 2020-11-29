import { Router } from "express";
import UserController from "../../controller/users/users";
import AuthMiddleware from "../../middleware/AuthMiddleware";

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
userRoute.delete(
  "/",
  AuthMiddleware.checkToken,
  AuthMiddleware.checkSuperAdmin,
  UserController.deleteAllUsers
);
userRoute.delete(
  "/user",
  AuthMiddleware.checkToken,
  AuthMiddleware.checkSuperAdmin,
  UserController.deleteUser
);

export default userRoute;
