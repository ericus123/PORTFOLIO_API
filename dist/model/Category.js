"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var categorySchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true,
    "default": "Uncategorized"
  },
  description: {
    type: String,
    required: true
  }
});

var _default = _mongoose["default"].model("Categories", categorySchema);

exports["default"] = _default;