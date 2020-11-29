"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var postSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: true,
    min: 6
  },
  description: {
    type: String,
    required: true,
    max: 255,
    min: 6
  },
  author: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Users"
  },
  category: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  comments: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Comments"
  }],
  likes: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "PostLikes"
  }],
  unLikes: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "PostUnLikes"
  }],
  date: {
    type: Date,
    "default": Date.now
  }
});

var _default = _mongoose["default"].model("Posts", postSchema);

exports["default"] = _default;