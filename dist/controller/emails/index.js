"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _emails = require("../../helpers/emails");

var EmailController = /*#__PURE__*/function () {
  function EmailController() {
    (0, _classCallCheck2["default"])(this, EmailController);
  }

  (0, _createClass2["default"])(EmailController, null, [{
    key: "sendEmail",
    value: function () {
      var _sendEmail2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _req$body, message, email, subject;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, message = _req$body.message, email = _req$body.email, subject = _req$body.subject;
                _context.next = 4;
                return (0, _emails.sendEmail)((0, _emails.setEmail)(process.env.EMAIL, email, subject, message)).then(function (result) {
                  return res.status(201).json({
                    msg: "Email sent successfuly"
                  });
                })["catch"](function (error) {
                  return res.status(500).json({
                    error: "Can't send email",
                    err: error
                  });
                });

              case 4:
                _context.next = 9;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(400).json({
                  error: "Something went wrong",
                  err: _context.t0
                }));

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 6]]);
      }));

      function sendEmail(_x, _x2) {
        return _sendEmail2.apply(this, arguments);
      }

      return sendEmail;
    }()
  }, {
    key: "sendEmails",
    value: function () {
      var _sendEmails2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var _req$body2, message, emails, subject;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _req$body2 = req.body, message = _req$body2.message, emails = _req$body2.emails, subject = _req$body2.subject;
                _context2.next = 4;
                return (0, _emails.sendEmails)(emails, (0, _emails.setEmail)(process.env.EMAIL, null, subject, message)).then(function (result) {
                  return res.status(201).json({
                    msg: "Emails sent successfuly"
                  });
                })["catch"](function (error) {
                  return res.status(500).json({
                    error: "Can't send emails",
                    err: error
                  });
                });

              case 4:
                _context2.next = 9;
                break;

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(400).json({
                  error: "Something went wrong",
                  err: _context2.t0
                }));

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 6]]);
      }));

      function sendEmails(_x3, _x4) {
        return _sendEmails2.apply(this, arguments);
      }

      return sendEmails;
    }()
  }]);
  return EmailController;
}();

var _default = EmailController;
exports["default"] = _default;