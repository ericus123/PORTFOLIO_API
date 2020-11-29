"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var newsLetterSchema = new _mongoose["default"].Schema({
  email: {
    type: String
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
});

var _default = _mongoose["default"].model("NewsLetter", newsLetterSchema);

exports["default"] = _default;