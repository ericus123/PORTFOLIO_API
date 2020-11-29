"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _users = _interopRequireDefault(require("../../controller/users/users"));

var _AuthMiddleware = _interopRequireDefault(require("../../middleware/AuthMiddleware"));

var userRoute = new _express.Router();
userRoute.get("/", _AuthMiddleware["default"].checkToken, _AuthMiddleware["default"].checkSuperAdmin, _users["default"].getAllUsers);
userRoute.get("/user", _AuthMiddleware["default"].checkToken, _AuthMiddleware["default"].checkSuperAdmin, _users["default"].getUser);
userRoute["delete"]("/", _AuthMiddleware["default"].checkToken, _AuthMiddleware["default"].checkSuperAdmin, _users["default"].deleteAllUsers);
userRoute["delete"]("/user", _AuthMiddleware["default"].checkToken, _AuthMiddleware["default"].checkSuperAdmin, _users["default"].deleteUser);
var _default = userRoute;
exports["default"] = _default;