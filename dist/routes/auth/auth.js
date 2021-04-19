"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _validation = require("../../middleware/validation");

var _auth = _interopRequireDefault(require("../../controller/auth/auth"));

var _AuthMiddleware = _interopRequireDefault(require("../../middleware/AuthMiddleware"));

var _newsLetter = _interopRequireDefault(require("../../middleware/subscriptions/newsLetter"));

var authRoute = new _express.Router();
authRoute.post("/register", _validation.userValidation, _auth["default"].Signup);
authRoute.post("/login", _validation.loginValidation, _auth["default"].Login);
authRoute.post("/check-login", _AuthMiddleware["default"].checkToken, _auth["default"].CheckLogin);
authRoute.put("/verify/:email/:token", _newsLetter["default"].checkEmail, _AuthMiddleware["default"].isNotVerified, _auth["default"].ConfEmail);
authRoute.post("/confirmation/resend/:email", _newsLetter["default"].checkEmail, _AuthMiddleware["default"].isNotVerified, _auth["default"].ResendConfEmail);
authRoute.post("/password/resetlink", _newsLetter["default"].checkEmail, _AuthMiddleware["default"].isVerified, _auth["default"].SendPassResetLink);
authRoute.put("/password/reset/:email/:token", _newsLetter["default"].checkEmail, _AuthMiddleware["default"].isVerified, _validation.PassResetValidation, _auth["default"].ResetPassword);
var _default = authRoute;
exports["default"] = _default;