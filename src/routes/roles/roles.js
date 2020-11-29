import { Router } from "express";
import RoleController from "../../controller/roles/roles";
import AuthMiddleware from "../../middleware/AuthMiddleware";
import { roleValidation } from "../.././middleware/validation";

const roleRoute = new Router();

roleRoute.patch(
  "/assign",
  AuthMiddleware.checkToken,
  AuthMiddleware.checkSuperAdmin,
  roleValidation,
  RoleController.assignRoles
);

export default roleRoute;
