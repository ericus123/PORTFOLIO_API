"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var replyReactionsSchema = new _mongoose["default"].Schema({
  user: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Users"
  },
  replyId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "CommentReplies"
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
});

var _default = _mongoose["default"].model("ReplyReactions", replyReactionsSchema);

exports["default"] = _default;