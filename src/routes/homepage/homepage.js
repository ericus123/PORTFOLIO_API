import { Router } from "express";
import AuthMiddleware from "../../middleware/AuthMiddleware";
import {
createWorkValidation,
updateWorkValidation
} from "../../middleware/validation";
import WorkController from "../../controller/homepage/work";


const homeRoute = new Router();

homeRoute.post("/works", AuthMiddleware.checkToken,AuthMiddleware.checkSuperAdmin, createWorkValidation,WorkController.createWork);
homeRoute.patch("/works/:workId", AuthMiddleware.checkToken,AuthMiddleware.checkSuperAdmin, updateWorkValidation,WorkController.updateWork);
homeRoute.get("/works/:workId", WorkController.getWork);
homeRoute.get("/works", WorkController.getWorks);
homeRoute.delete("/works/:workId", AuthMiddleware.checkToken,AuthMiddleware.checkSuperAdmin,WorkController.deleteWork);


export default homeRoute;