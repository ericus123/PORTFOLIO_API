"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _validation = require("../../middleware/validation");

var _auth = _interopRequireDefault(require("../../controller/auth/auth"));

var authRoute = new _express.Router();
authRoute.post("/register", _validation.userValidation, _auth["default"].Signup);
authRoute.post("/login", _validation.loginValidation, _auth["default"].Login);
authRoute.get("/confirmation/:id/:token", _auth["default"].ConfirmEmail);
authRoute.post("/confirmation/resend/:id/:token", _auth["default"].ResendConfEmail);
var _default = authRoute;
exports["default"] = _default;