"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _roles = _interopRequireDefault(require("../../controller/roles/roles"));

var _AuthMiddleware = _interopRequireDefault(require("../../middleware/AuthMiddleware"));

var _validation = require("../.././middleware/validation");

var roleRoute = new _express.Router();
roleRoute.patch("/assign", _AuthMiddleware["default"].checkToken, _AuthMiddleware["default"].checkSuperAdmin, _validation.roleValidation, _roles["default"].assignRoles);
var _default = roleRoute;
exports["default"] = _default;