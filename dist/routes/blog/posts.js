"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _AuthMiddleware = _interopRequireDefault(require("../../middleware/AuthMiddleware"));

var _validation = require("../../middleware/validation");

var _posts = _interopRequireDefault(require("../../controller/blog/posts"));

var _PostsMiddleware = _interopRequireDefault(require("../../middleware/PostsMiddleware"));

var postRoute = new _express.Router();
postRoute.post("/", _AuthMiddleware["default"].checkToken, _AuthMiddleware["default"].checkAdmin, _validation.postValidation, _PostsMiddleware["default"].checkPostTitle, _posts["default"].createPost);
postRoute.post("/:postId/react", _AuthMiddleware["default"].checkToken, _PostsMiddleware["default"].postExist, _posts["default"].reactToThePost);
postRoute.get("/reactions/:postId", _AuthMiddleware["default"].checkToken, _PostsMiddleware["default"].postExist, _posts["default"].getPostReactions);
postRoute.get("/", _posts["default"].getPosts);
postRoute.get("/categories", _posts["default"].getPostCats);
postRoute.post("/category", _AuthMiddleware["default"].checkToken, _AuthMiddleware["default"].checkAdmin, _validation.categoryValidation, _PostsMiddleware["default"].checkCatCreation, _posts["default"].createPostCat);
postRoute.patch("/category/:category", _AuthMiddleware["default"].checkToken, _AuthMiddleware["default"].checkAdmin, _validation.categoryValidation, _PostsMiddleware["default"].checkCategoryUpdate, _posts["default"].updatePostCat);
postRoute["delete"]("/category/:category", _AuthMiddleware["default"].checkToken, _AuthMiddleware["default"].checkAdmin, _posts["default"].deleteCategory);
postRoute.get("/category/:category", _posts["default"].getPostCat);
postRoute.get("/search", _posts["default"].searchPosts);
postRoute.get("/category/:category", _posts["default"].getPostsByCategory);
postRoute.get("/:id", _posts["default"].getPost);
postRoute.patch("/:id", _AuthMiddleware["default"].checkToken, _AuthMiddleware["default"].checkAdmin, _validation.postValidation, _PostsMiddleware["default"].checkPostTitle, _posts["default"].updatePost);
postRoute["delete"]("/:id", _AuthMiddleware["default"].checkToken, _AuthMiddleware["default"].checkAdmin, _posts["default"].deletePost);
postRoute.post("/replies/:replyId/react", _AuthMiddleware["default"].checkToken, _PostsMiddleware["default"].replyExist, _posts["default"].reactToThePostCommentReply); //comments

postRoute.post("/:postId/comment", _AuthMiddleware["default"].checkToken, _validation.postCommentValidation, _posts["default"].postComment);
postRoute["delete"]("/:postId/:commentId", _AuthMiddleware["default"].checkToken, _PostsMiddleware["default"].checkPostComment, _posts["default"].deleteComment);
postRoute.patch("/:postId/:commentId", _AuthMiddleware["default"].checkToken, _PostsMiddleware["default"].checkPostComment, _validation.postCommentValidation, _posts["default"].editComment);
postRoute.patch("/comments/:commentId/react", _AuthMiddleware["default"].checkToken, _PostsMiddleware["default"].commentExist, _posts["default"].reactToThePostComment); //comment replies

postRoute.post("/replies/:commentId", _AuthMiddleware["default"].checkToken, _PostsMiddleware["default"].commentExist, _validation.postCommentReplyValidation, _posts["default"].postCommentReply);
postRoute["delete"]("/:postId/:commentId/:commentReplyId", _AuthMiddleware["default"].checkToken, _PostsMiddleware["default"].checkPostComment, _PostsMiddleware["default"].checkPostCommentReply, _posts["default"].deleteCommentReply);
postRoute.patch("/:postId/:commentId/:commentReplyId", _AuthMiddleware["default"].checkToken, _PostsMiddleware["default"].checkPostComment, _PostsMiddleware["default"].checkPostCommentReply, _validation.postCommentReplyValidation, _posts["default"].editCommentReply);
var _default = postRoute;
exports["default"] = _default;