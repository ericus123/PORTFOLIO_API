"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var commentLikesSchema = new _mongoose["default"].Schema({
  user: {},
  userId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    "default": Date.now
  }
});

var _default = _mongoose["default"].model("CommentLikes", commentLikesSchema);

exports["default"] = _default;