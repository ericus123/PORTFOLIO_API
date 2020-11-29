import { Router } from "express";
import AuthMiddleware from "../../middleware/AuthMiddleware";
import {
  BlogVideosValidation,
  BlogVideosUpdateValidation,
} from "../../middleware/validation";
import PostController from "../../controller/blog/posts";

const blogVideosRoute = new Router();

blogVideosRoute.post(
  "/videos",
  AuthMiddleware.checkToken,
  AuthMiddleware.checkAdmin,
  BlogVideosValidation,
  PostController.createBlogVideo
);
blogVideosRoute.patch(
  "/videos/:id",
  AuthMiddleware.checkToken,
  AuthMiddleware.checkAdmin,
  BlogVideosUpdateValidation,
  PostController.updateBlogVideo
);
blogVideosRoute.get("/videos", PostController.getBlogVideos);

export default blogVideosRoute;
