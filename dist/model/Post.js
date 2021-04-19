"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _slugify = _interopRequireDefault(require("slugify"));

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
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Categories"
  },
  imageUrl: {
    type: String
  },
  image_public_id: {
    type: String,
    "default": null
  },
  comments: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Comments"
  }],
  likes: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "PostReactions"
  }],
  slug: {
    type: String,
    unique: true
  },
  updatedBy: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Users"
  },
  createdAt: {
    type: Date,
    "default": Date.now
  },
  updatedAt: {
    type: Date,
    "default": null
  }
});
postSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = (0, _slugify["default"])(this.title, {
      lower: true,
      strict: true
    });
  }

  next();
});

var _default = _mongoose["default"].model("Posts", postSchema);

exports["default"] = _default;