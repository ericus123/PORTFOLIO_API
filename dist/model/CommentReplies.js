"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var commentRepliesSchema = new _mongoose["default"].Schema({
  user: {},
  description: {},
  date: {
    type: Date,
    "default": Date.now
  },
  likes: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "CommentReplyLikes"
  }],
  unLikes: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "CommentReplyUnLikes"
  }]
});

var _default = _mongoose["default"].model("CommentReplies", commentRepliesSchema);

exports["default"] = _default;