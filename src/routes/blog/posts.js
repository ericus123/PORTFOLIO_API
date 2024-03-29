import { Router } from "express";
import AuthMiddleware from "../../middleware/AuthMiddleware";
import {
  postValidation,
  postCommentValidation,
  postCommentReplyValidation,
} from "../../middleware/validation";
import PostController from "../../controller/blog/posts";
import { categoryValidation } from "../../middleware/validation";
import PostsMiddleware from "../../middleware/PostsMiddleware";

const postRoute = new Router();
postRoute.post(
  "/",
  AuthMiddleware.checkToken,
  AuthMiddleware.checkAdmin,
  postValidation,
  PostsMiddleware.checkPostTitle,
  PostController.createPost
);

postRoute.post(
  "/reactions/:postId",
  AuthMiddleware.checkToken,
  PostsMiddleware.postExist,
  PostController.reactToThePost
);

postRoute.get(
  "/reactions/:postId",
  PostsMiddleware.postExist,
  PostController.getPostReactions
);
postRoute.get("/all/:status", PostController.getPosts);
postRoute.get("/all", PostController.getPostsAll);
postRoute.get("/categories", PostController.getPostCats);
postRoute.post(
  "/category",
  AuthMiddleware.checkToken,
  AuthMiddleware.checkAdmin,
  categoryValidation,
  PostsMiddleware.checkCatCreation,
  PostController.createPostCat
);
postRoute.patch(
  "/category/:category",
  AuthMiddleware.checkToken,
  AuthMiddleware.checkAdmin,
  PostsMiddleware.checkCategoryUpdate,
  categoryValidation,
  PostsMiddleware.checkCatCreation,
  PostController.updatePostCat
);
postRoute.delete(
  "/category/:category",
  AuthMiddleware.checkToken,
  AuthMiddleware.checkAdmin,
  PostsMiddleware.checkCategoryUpdate,
  PostController.deleteCategory
);
postRoute.get(
  "/category/:category",
  PostsMiddleware.checkCategoryUpdate,
  PostController.getPostCat
);

postRoute.get("/search", PostController.searchPosts);
postRoute.get(
  "/categories/:category",
  PostsMiddleware.checkCatCreation,
  PostController.getPostsByCategory
);
postRoute.get("/:slug", PostController.getPost);
postRoute.patch(
  "/:id",
  AuthMiddleware.checkToken,
  AuthMiddleware.checkAdmin,
  postValidation,
  PostsMiddleware.checkPostTitle,
  PostController.updatePost
);
postRoute.delete(
  "/:id",
  AuthMiddleware.checkToken,
  AuthMiddleware.checkAdmin,
  PostController.deletePost
);

postRoute.post(
  "/replies/:replyId/react",
  AuthMiddleware.checkToken,
  PostsMiddleware.replyExist,
  PostController.reactToThePostCommentReply
);

//comments

postRoute.post(
  "/comments/:postId",
  AuthMiddleware.checkToken,
  PostsMiddleware.postExist,
  postCommentValidation,
  PostController.postComment
);
postRoute.get(
  "/comments/:postId",
  PostsMiddleware.postExist,
  PostController.getComments
);
postRoute.get("/comments/single/:commentId", PostController.getComment);
postRoute.delete(
  "/comments/:commentId",
  AuthMiddleware.checkToken,
  PostsMiddleware.commentExist,
  PostController.deleteComment
);
postRoute.patch(
  "/comments/:commentId",
  AuthMiddleware.checkToken,
  PostsMiddleware.commentExist,
  postCommentValidation,
  PostController.editComment
);
postRoute.post(
  "/comments/:commentId/react",
  AuthMiddleware.checkToken,
  PostsMiddleware.commentExist,
  PostController.reactToThePostComment
);
//comment replies

postRoute.post(
  "/replies/:commentId",
  AuthMiddleware.checkToken,
  PostsMiddleware.commentExist,
  postCommentReplyValidation,
  PostController.postCommentReply
);
postRoute.delete(
  "/replies/:replyId",
  AuthMiddleware.checkToken,
  PostsMiddleware.replyExist,
  PostController.deleteCommentReply
);
postRoute.patch(
  "/replies/:replyId",
  AuthMiddleware.checkToken,
  PostsMiddleware.replyExist,
  postCommentReplyValidation,
  PostController.editCommentReply
);
postRoute.post(
  "/replies/:replyId/react",
  AuthMiddleware.checkToken,
  PostsMiddleware.replyExist,
  PostController.reactToThePostCommentReply
);

export default postRoute;
