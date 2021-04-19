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

var _deepEmailValidator = _interopRequireDefault(require("deep-email-validator"));

var NewsLetterMiddleware = /*#__PURE__*/function () {
  function NewsLetterMiddleware() {
    (0, _classCallCheck2["default"])(this, NewsLetterMiddleware);
  }

  (0, _createClass2["default"])(NewsLetterMiddleware, null, [{
    key: "checkEmail",
    value: function () {
      var _checkEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        var email, _yield$validate, valid;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                email = req.body.email ? req.body.email : req.params.email;

                if (!(!email || !email.length)) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  error: "Email is required"
                }));

              case 3:
                _context.next = 5;
                return (0, _deepEmailValidator["default"])({
                  email: email,
                  sender: process.env.EMAIL,
                  validateRegex: true,
                  validateMx: true,
                  validateTypo: true,
                  validateDisposable: true,
                  validateSMTP: true
                });

              case 5:
                _yield$validate = _context.sent;
                valid = _yield$validate.valid;

                if (valid) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  error: "Email is invalid",
                  email: email
                }));

              case 9:
                next();

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function checkEmail(_x, _x2, _x3) {
        return _checkEmail.apply(this, arguments);
      }

      return checkEmail;
    }()
  }]);
  return NewsLetterMiddleware;
}();

var _default = NewsLetterMiddleware;
exports["default"] = _default;