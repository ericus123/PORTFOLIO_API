"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _newsLetter = _interopRequireDefault(require("../../controller/subscriptions/newsLetter"));

var _newsLetter2 = _interopRequireDefault(require("../../middleware/subscriptions/newsLetter"));

var _AuthMiddleware = _interopRequireDefault(require("../../middleware/AuthMiddleware"));

var newsLetterRoute = new _express.Router();
newsLetterRoute.post("/subscribe/:email", _newsLetter2["default"].checkEmail, _newsLetter["default"].subscribe);
newsLetterRoute.get("/subscribers", _AuthMiddleware["default"].checkToken, _AuthMiddleware["default"].checkAdmin, _newsLetter["default"].getSubscribers);
newsLetterRoute.get("/subscriber/:email", _AuthMiddleware["default"].checkToken, _AuthMiddleware["default"].checkAdmin, _newsLetter["default"].getSubscriber);
newsLetterRoute.post("/unsubscribe/:email", _newsLetter["default"].unsubscribe);
var _default = newsLetterRoute;
exports["default"] = _default;