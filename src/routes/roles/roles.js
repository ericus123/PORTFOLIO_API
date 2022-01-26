import { Router } from "express";
import RoleController from "../../controller/roles/roles";
import AuthMiddleware from "../../middleware/AuthMiddleware";
import { userRoleAssignValidation } from "../.././middleware/validation";

const roleRoute = new Router();

roleRoute.patch(
  "/assign",
  AuthMiddleware.checkToken,
  AuthMiddleware.checkSuperAdmin,
  userRoleAssignValidation,
  RoleController.assignUserRole
);
export default roleRoute;
