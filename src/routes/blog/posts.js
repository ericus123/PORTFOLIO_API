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
  "/:postId/react",
  AuthMiddleware.checkToken,
  PostsMiddleware.postExist,
  PostController.reactToThePost
);

postRoute.get(
  "/reactions/:postId",
  AuthMiddleware.checkToken,
  PostsMiddleware.postExist,
  PostController.getPostReactions
);
postRoute.get("/", PostController.getPosts);
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
  categoryValidation,
  PostsMiddleware.checkCategoryUpdate,
  PostController.updatePostCat
);
postRoute.delete(
  "/category/:category",
  AuthMiddleware.checkToken,
  AuthMiddleware.checkAdmin,
  PostController.deleteCategory
);
postRoute.get("/category/:category", PostController.getPostCat);
postRoute.get("/search", PostController.searchPosts);
postRoute.get("/category/:category", PostController.getPostsByCategory);
postRoute.get("/:id", PostController.getPost);
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
postRoute.patch(
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
