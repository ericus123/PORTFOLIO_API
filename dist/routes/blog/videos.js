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

var blogVideosRoute = new _express.Router();
blogVideosRoute.post("/videos", _AuthMiddleware["default"].checkToken, _AuthMiddleware["default"].checkAdmin, _validation.BlogVideosValidation, _posts["default"].createBlogVideo);
blogVideosRoute.patch("/videos/:id", _AuthMiddleware["default"].checkToken, _AuthMiddleware["default"].checkAdmin, _validation.BlogVideosUpdateValidation, _posts["default"].updateBlogVideo);
blogVideosRoute.get("/videos", _posts["default"].getBlogVideos);
var _default = blogVideosRoute;
exports["default"] = _default;