"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var commentSchema = new _mongoose["default"].Schema({
  user: {},
  description: {
    type: String
  },
  replies: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "CommentReplies"
  }],
  likes: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "CommentLikes"
  }],
  unLikes: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "CommentUnLikes"
  }],
  date: {
    type: Date,
    "default": Date.now
  }
});

var _default = _mongoose["default"].model("Comments", commentSchema);

exports["default"] = _default;