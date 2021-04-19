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
  },
  updatedBy: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User",
    "default": null
  },
  createdAt: {
    type: Date,
    "default": Date.now
  },
  updatedAt: {
    type: Date,
    "default": null
  },
  createdBy: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  }
});

var _default = _mongoose["default"].model("Categories", categorySchema);

exports["default"] = _default;