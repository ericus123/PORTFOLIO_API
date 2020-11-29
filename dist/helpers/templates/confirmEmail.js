"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.confirmEmail = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var confirmEmail = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(email, token, subject) {
    var msg;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            msg = {
              to: "".concat(email),
              // Change to your recipient
              from: "".concat(process.env.SENDER_EMAIL),
              // Change to your verified sender
              subject: "".concat(subject),
              text: "Hello,\n\n" + "Please verify your account by clicking the link: \nhttp://www.amaniericus.com/confirmation/" + token + ".\n"
            };
            _context.next = 3;
            return sgMail.send(msg).then(function () {
              res.status(201).json({
                msg: "Confirmation email has been sent to ".concat(email)
              });
            })["catch"](function (error) {
              res.status(400).json({
                error: error,
                msg: "error occured"
              });
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function confirmEmail(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.confirmEmail = confirmEmail;