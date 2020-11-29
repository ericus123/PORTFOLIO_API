"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var messageSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    min: 6,
    required: true,
    email: true
  },
  message: {
    type: String,
    min: 6,
    required: true
  },
  date: {
    type: Date,
    "default": Date.now
  }
});

var _default = _mongoose["default"].model("Message", messageSchema);

exports["default"] = _default;