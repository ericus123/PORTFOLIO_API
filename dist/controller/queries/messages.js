"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getmessagesController = exports.deletemsgController = exports.messagesController = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Message = _interopRequireDefault(require("../../model/Message"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var messagesController = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var message, savedMessage;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            message = new _Message["default"]({
              name: req.body.name,
              email: req.body.email,
              message: req.body.message
            });
            _context.prev = 1;
            _context.next = 4;
            return message.save();

          case 4:
            savedMessage = _context.sent;
            res.status(200).json({
              msg: savedMessage,
              success: "Thanks for contacting us!"
            });
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            res.status(400).json({
              error: _context.t0
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 8]]);
  }));

  return function messagesController(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.messagesController = messagesController;

var getmessagesController = function getmessagesController(req, res) {
  _Message["default"].find({}, function (err, result) {
    if (err) {
      res.status(400).json({
        error: err
      });
    } else {
      res.status(400).json({
        messages: result
      });
    }
  });
};

exports.getmessagesController = getmessagesController;

var deletemsgController = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var message;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Message["default"].findOne({
              _id: req.params.id
            });

          case 3:
            message = _context2.sent;
            _context2.next = 6;
            return message.deleteOne();

          case 6:
            res.send({
              message: "Message successfully deleted!"
            });
            _context2.next = 13;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            res.status(404);
            res.send({
              error: "Message with id=" + req.params.id + "is not found "
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function deletemsgController(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.deletemsgController = deletemsgController;