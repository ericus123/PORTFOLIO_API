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
postRoute.post("/", _AuthMiddleware["default"].checkToken, _AuthMiddleware["default"].checkAdmin, _validation.postValidation, _posts["default"].createPost);
postRoute.post("/:postId/react/:action", _AuthMiddleware["default"].checkToken, _posts["default"].reactToThePost);
postRoute.get("/", _posts["default"].getPosts);
postRoute.get("/categories", _posts["default"].getPostCats);
postRoute.post("/category", _AuthMiddleware["default"].checkToken, _AuthMiddleware["default"].checkAdmin, _validation.categoryValidation, _posts["default"].createPostCat);
postRoute.get("/category", _posts["default"].getPostCats);
postRoute.get("/search", _posts["default"].searchPosts);
postRoute.get("/category/:category", _posts["default"].getPostsByCategory);
postRoute.get("/:id", _posts["default"].getPost);
postRoute.patch("/:id", _AuthMiddleware["default"].checkToken, _AuthMiddleware["default"].checkAdmin, _validation.postValidation, _posts["default"].updatePost);
postRoute["delete"]("/:id", _AuthMiddleware["default"].checkToken, _AuthMiddleware["default"].checkAdmin, _posts["default"].deletePost); //likes

postRoute.patch("/:postId/:action", _AuthMiddleware["default"].checkToken, _PostsMiddleware["default"].checkPostReaction, _posts["default"].reactToThePost);
postRoute.patch("/:postId/:commentId/:action", _AuthMiddleware["default"].checkToken, _PostsMiddleware["default"].checkPostComment, _posts["default"].reactToThePostComment);
postRoute.patch("/:postId/:commentId/:replyId/:action", _AuthMiddleware["default"].checkToken, _PostsMiddleware["default"].checkPostComment, _posts["default"].reactToThePostCommentReply); //comments

postRoute.post("/:postId/comment", _AuthMiddleware["default"].checkToken, _validation.postCommentValidation, _posts["default"].postComment);
postRoute["delete"]("/:postId/:commentId", _AuthMiddleware["default"].checkToken, _PostsMiddleware["default"].checkPostComment, _posts["default"].deleteComment);
postRoute.patch("/:postId/:commentId", _AuthMiddleware["default"].checkToken, _PostsMiddleware["default"].checkPostComment, _validation.postCommentValidation, _posts["default"].editComment); //comment replies

postRoute.post("/:postId/:commentId/reply", _AuthMiddleware["default"].checkToken, _PostsMiddleware["default"].checkPostComment, _validation.postCommentReplyValidation, _posts["default"].postCommentReply);
postRoute["delete"]("/:postId/:commentId/:commentReplyId", _AuthMiddleware["default"].checkToken, _PostsMiddleware["default"].checkPostComment, _PostsMiddleware["default"].checkPostCommentReply, _posts["default"].deleteCommentReply);
postRoute.patch("/:postId/:commentId/:commentReplyId", _AuthMiddleware["default"].checkToken, _PostsMiddleware["default"].checkPostComment, _PostsMiddleware["default"].checkPostCommentReply, _validation.postCommentReplyValidation, _posts["default"].editCommentReply);
var _default = postRoute;
exports["default"] = _default;