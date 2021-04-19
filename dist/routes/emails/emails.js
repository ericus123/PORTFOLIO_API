"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _AuthMiddleware = _interopRequireDefault(require("../../middleware/AuthMiddleware"));

var _newsLetter = _interopRequireDefault(require("../../middleware/subscriptions/newsLetter"));

var _index = _interopRequireDefault(require("../../controller/emails/index"));

var _validation = require("../../middleware/validation");

var emailRoute = new _express.Router();
emailRoute.post("/", _AuthMiddleware["default"].checkToken, _AuthMiddleware["default"].checkSuperAdmin, _validation.validateEmail, _newsLetter["default"].checkEmail, _index["default"].sendEmail);
emailRoute.post("/multiple", _AuthMiddleware["default"].checkToken, _AuthMiddleware["default"].checkSuperAdmin, _validation.validateEmails, _index["default"].sendEmails);
var _default = emailRoute;
exports["default"] = _default;