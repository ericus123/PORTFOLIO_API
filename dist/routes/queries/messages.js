"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _validation = require("../../middleware/validation");

var _AuthMiddleware = _interopRequireDefault(require("../../middleware/AuthMiddleware"));

var _messages = require("../../controller/queries/messages");

var messageRoute = new _express.Router(); //create messages

messageRoute.post("/", _validation.messageValidation, _messages.messagesController); //Get messages form db

messageRoute.get("/", _AuthMiddleware["default"], _messages.getmessagesController); //Delete a message

messageRoute["delete"]("/:id", _AuthMiddleware["default"], _messages.deletemsgController);
var _default = messageRoute;
exports["default"] = _default;