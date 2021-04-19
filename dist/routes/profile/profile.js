"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _validation = require("../../middleware/validation");

var _profiles = _interopRequireDefault(require("../../controller/profiles/profiles"));

var _AuthMiddleware = _interopRequireDefault(require("../../middleware/AuthMiddleware"));

var profileRoute = new _express.Router();
profileRoute.put("/", _AuthMiddleware["default"].checkToken, _validation.profileUpdateValidation, _profiles["default"].updateProfile);
profileRoute.get("/", _AuthMiddleware["default"].checkToken, _profiles["default"].viewProfile);
profileRoute["delete"]("/", _AuthMiddleware["default"].checkToken, _profiles["default"].deleteAccount);
profileRoute.patch("/", _AuthMiddleware["default"].checkToken, _AuthMiddleware["default"].profileIsIncomplete, _validation.completeProfileValidation, _profiles["default"].completeProfile);
var _default = profileRoute;
exports["default"] = _default;