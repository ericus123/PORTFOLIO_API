"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var blogVideosSchema = new _mongoose["default"].Schema({
  author: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  },
  link: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  CreatedAt: {
    type: Date,
    "default": Date.now
  }
});

var _default = _mongoose["default"].model("BlogVideos", blogVideosSchema);

exports["default"] = _default;