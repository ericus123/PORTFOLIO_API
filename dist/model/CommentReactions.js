"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var commentReactionsSchema = new _mongoose["default"].Schema({
  user: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Users"
  },
  commentId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Comments"
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
});

var _default = _mongoose["default"].model("CommentReactions", commentReactionsSchema);

exports["default"] = _default;