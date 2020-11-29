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
  PostController.createPost
);

postRoute.post(
  "/:postId/react/:action",
  AuthMiddleware.checkToken,
  PostController.reactToThePost
);
postRoute.get("/", PostController.getPosts);
postRoute.get("/categories", PostController.getPostCats);
postRoute.post(
  "/category",
  AuthMiddleware.checkToken,
  AuthMiddleware.checkAdmin,
  categoryValidation,
  PostController.createPostCat
);
postRoute.get("/category", PostController.getPostCats);
postRoute.get("/search", PostController.searchPosts);
postRoute.get("/category/:category", PostController.getPostsByCategory);
postRoute.get("/:id", PostController.getPost);
postRoute.patch(
  "/:id",
  AuthMiddleware.checkToken,
  AuthMiddleware.checkAdmin,
  postValidation,
  PostController.updatePost
);
postRoute.delete(
  "/:id",
  AuthMiddleware.checkToken,
  AuthMiddleware.checkAdmin,
  PostController.deletePost
);

//likes
postRoute.patch(
  "/:postId/:action",
  AuthMiddleware.checkToken,
  PostsMiddleware.checkPostReaction,
  PostController.reactToThePost
);
postRoute.patch(
  "/:postId/:commentId/:action",
  AuthMiddleware.checkToken,
  PostsMiddleware.checkPostComment,
  PostController.reactToThePostComment
);
postRoute.patch(
  "/:postId/:commentId/:replyId/:action",
  AuthMiddleware.checkToken,
  PostsMiddleware.checkPostComment,
  PostController.reactToThePostCommentReply
);

//comments

postRoute.post(
  "/:postId/comment",
  AuthMiddleware.checkToken,
  postCommentValidation,
  PostController.postComment
);
postRoute.delete(
  "/:postId/:commentId",
  AuthMiddleware.checkToken,
  PostsMiddleware.checkPostComment,
  PostController.deleteComment
);
postRoute.patch(
  "/:postId/:commentId",
  AuthMiddleware.checkToken,
  PostsMiddleware.checkPostComment,
  postCommentValidation,
  PostController.editComment
);

//comment replies

postRoute.post(
  "/:postId/:commentId/reply",
  AuthMiddleware.checkToken,
  PostsMiddleware.checkPostComment,
  postCommentReplyValidation,
  PostController.postCommentReply
);
postRoute.delete(
  "/:postId/:commentId/:commentReplyId",
  AuthMiddleware.checkToken,
  PostsMiddleware.checkPostComment,
  PostsMiddleware.checkPostCommentReply,
  PostController.deleteCommentReply
);
postRoute.patch(
  "/:postId/:commentId/:commentReplyId",
  AuthMiddleware.checkToken,
  PostsMiddleware.checkPostComment,
  PostsMiddleware.checkPostCommentReply,
  postCommentReplyValidation,
  PostController.editCommentReply
);

export default postRoute;
