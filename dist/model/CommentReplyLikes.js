"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var commentReplyLikesSchema = new _mongoose["default"].Schema({
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

var _default = _mongoose["default"].model("CommentReplyLikes", commentReplyLikesSchema);

exports["default"] = _default;