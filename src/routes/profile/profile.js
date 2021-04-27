import { Router } from "express";
import {
  profileUpdateValidation,
  completeProfileValidation,
  uploadImageValidation
} from "../../middleware/validation";
import ProfileController from "../../controller/profiles/profiles";
import AuthMiddleware from "../../middleware/AuthMiddleware";

const profileRoute = new Router();
profileRoute.put(
  "/",
  AuthMiddleware.checkToken,
  profileUpdateValidation,
  ProfileController.updateProfile
);
profileRoute.patch(
  "/change",
  AuthMiddleware.checkToken,
  uploadImageValidation,
  ProfileController.changeProfileImage
);
profileRoute.get("/", AuthMiddleware.checkToken, ProfileController.viewProfile);
profileRoute.delete(
  "/",
  AuthMiddleware.checkToken,
  ProfileController.deleteAccount
);

profileRoute.patch(
  "/",
  AuthMiddleware.checkToken,
  AuthMiddleware.profileIsIncomplete,
  completeProfileValidation,
  ProfileController.completeProfile
);
export default profileRoute;
