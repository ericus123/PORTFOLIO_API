"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _newsLetter = _interopRequireDefault(require("../../controller/subscriptions/newsLetter"));

var _newsLetter2 = _interopRequireDefault(require("../../middleware/subscriptions/newsLetter"));

var newsLetterRoute = new _express.Router();
newsLetterRoute.post("/subscribe", _newsLetter2["default"].checkEmail, _newsLetter["default"].subscribe);
newsLetterRoute.post("/unsubscribe/:email", _newsLetter["default"].unsubscribe);
var _default = newsLetterRoute;
exports["default"] = _default;