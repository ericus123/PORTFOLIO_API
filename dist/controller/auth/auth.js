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

var _User = _interopRequireDefault(require("../../model/User"));

var _VerificationToken = _interopRequireDefault(require("../../model/VerificationToken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _crypto = _interopRequireDefault(require("crypto"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _emailTemplates = require("../../helpers/emailTemplates");

var _sendEmails = require("../../helpers/sendEmails");

_dotenv["default"].config();

var AuthController = /*#__PURE__*/function () {
  function AuthController() {
    (0, _classCallCheck2["default"])(this, AuthController);
  }

  (0, _createClass2["default"])(AuthController, null, [{
    key: "Login",
    value: function () {
      var _Login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var user, validPass, login, token;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _User["default"].findOne({
                  email: req.body.email
                });

              case 2:
                user = _context.sent;

                if (user) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  error: "Incorrect credentials"
                }));

              case 5:
                _context.next = 7;
                return _bcryptjs["default"].compare(req.body.password, user.password);

              case 7:
                validPass = _context.sent;

                if (validPass) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  error: "Incorrect credentials"
                }));

              case 10:
                _context.next = 12;
                return _User["default"].findOne({
                  email: req.body.email,
                  password: user.password
                });

              case 12:
                login = _context.sent;

                if (login) {
                  _context.next = 15;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  error: "Incorrect credentials"
                }));

              case 15:
                if (user.isVerified) {
                  _context.next = 17;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  error: "Your account has not been verified"
                }));

              case 17:
                //create and assign a token
                token = _jsonwebtoken["default"].sign({
                  role: login.role,
                  id: login._id,
                  username: login.username,
                  email: login.email,
                  firstName: login.firstName,
                  lastName: login.lastName,
                  imageUrl: login.imageUrl
                }, process.env.TOKEN_SECRET, {
                  expiresIn: "1d"
                });
                return _context.abrupt("return", res.status(200).json({
                  msg: "logged in successfuly",
                  token: token
                }));

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function Login(_x, _x2) {
        return _Login.apply(this, arguments);
      }

      return Login;
    }()
  }, {
    key: "Signup",
    value: function () {
      var _Signup = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var _req$body, username, firstName, lastName, email, password, emailExists, salt, hashedPassword, user, savedUser, token, url;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(req.body.confPassword != req.body.password)) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", res.status(400).json({
                  error: "Passwords do not match"
                }));

              case 2:
                _context2.prev = 2;
                _req$body = req.body, username = _req$body.username, firstName = _req$body.firstName, lastName = _req$body.lastName, email = _req$body.email, password = _req$body.password;
                _context2.next = 6;
                return _User["default"].findOne({
                  email: req.body.email
                });

              case 6:
                emailExists = _context2.sent;

                if (!emailExists) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt("return", res.status(400).json({
                  error: "Email already exists"
                }));

              case 9:
                _context2.next = 11;
                return _bcryptjs["default"].genSalt(10);

              case 11:
                salt = _context2.sent;
                _context2.next = 14;
                return _bcryptjs["default"].hash(password, salt);

              case 14:
                hashedPassword = _context2.sent;
                user = new _User["default"]({
                  username: username,
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  password: hashedPassword
                });
                _context2.next = 18;
                return user.save();

              case 18:
                savedUser = _context2.sent;
                token = new _VerificationToken["default"]({
                  _userId: user._id,
                  token: _crypto["default"].randomBytes(16).toString("hex")
                });
                _context2.next = 22;
                return token.save();

              case 22:
                (0, _sendEmails.SendConfEmail)();
                url = "".concat(process.env.FRONTEND_URL, "/account/verify/").concat(user.id, "/").concat(token.token);
                _context2.next = 29;
                break;

              case 26:
                _context2.prev = 26;
                _context2.t0 = _context2["catch"](2);
                res.status(400).json({
                  err: _context2.t0,
                  error: "Error occured"
                });

              case 29:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 26]]);
      }));

      function Signup(_x3, _x4) {
        return _Signup.apply(this, arguments);
      }

      return Signup;
    }()
  }, {
    key: "ConfEmail",
    value: function () {
      var _ConfEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var _req$params, id, token, user, _token;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _req$params = req.params, id = _req$params.id, token = _req$params.token;
                _context3.next = 4;
                return _User["default"].findOne({
                  _id: id
                });

              case 4:
                user = _context3.sent;

                if (user) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return", res.status(400).json({
                  error: "User not found"
                }));

              case 7:
                if (!user.isVerified) {
                  _context3.next = 9;
                  break;
                }

                return _context3.abrupt("return", res.status(400).json({
                  error: "Your account is already verified, please login!"
                }));

              case 9:
                _context3.next = 11;
                return _VerificationToken["default"].findOne({
                  token: token,
                  _userId: id
                });

              case 11:
                _token = _context3.sent;

                if (_token) {
                  _context3.next = 14;
                  break;
                }

                return _context3.abrupt("return", res.status(400).json({
                  error: "Invalid token"
                }));

              case 14:
                user.isVerified = true;
                _context3.next = 17;
                return user.save();

              case 17:
                _context3.next = 19;
                return _token["delete"]();

              case 19:
                return _context3.abrupt("return", res.status(201).json({
                  msg: "Your account is verified now, please login!"
                }));

              case 22:
                _context3.prev = 22;
                _context3.t0 = _context3["catch"](0);
                res.status(500).json({
                  error: "Something went wrong, try again",
                  err: _context3.t0
                });

              case 25:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 22]]);
      }));

      function ConfEmail(_x5, _x6) {
        return _ConfEmail.apply(this, arguments);
      }

      return ConfEmail;
    }()
  }, {
    key: "ResendConfEmail",
    value: function () {
      var _ResendConfEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var _req$params2, id, __token, user, _token, token;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _req$params2 = req.params, id = _req$params2.id, __token = _req$params2.__token;
                _context4.next = 4;
                return _User["default"].findOne({
                  _id: id
                });

              case 4:
                user = _context4.sent;

                if (user) {
                  _context4.next = 7;
                  break;
                }

                return _context4.abrupt("return", res.status(400).json({
                  error: "User not found"
                }));

              case 7:
                if (!user.isVerified) {
                  _context4.next = 9;
                  break;
                }

                return _context4.abrupt("return", res.status(400).json({
                  error: "Your account is already verified, please login!"
                }));

              case 9:
                _context4.next = 11;
                return _VerificationToken["default"].findOne({
                  _userId: user._id,
                  token: __token
                });

              case 11:
                _token = _context4.sent;

                if (!_token) {
                  _context4.next = 15;
                  break;
                }

                _context4.next = 15;
                return _token["delete"]();

              case 15:
                token = new _VerificationToken["default"]({
                  _userId: user._id,
                  token: _crypto["default"].randomBytes(16).toString("hex")
                });
                _context4.next = 18;
                return token.save();

              case 18:
                (0, _sendEmails.SendConfEmail)();
                _context4.next = 24;
                break;

              case 21:
                _context4.prev = 21;
                _context4.t0 = _context4["catch"](0);
                res.status(400).json({
                  error: _context4.t0
                });

              case 24:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 21]]);
      }));

      function ResendConfEmail(_x7, _x8) {
        return _ResendConfEmail.apply(this, arguments);
      }

      return ResendConfEmail;
    }()
  }]);
  return AuthController;
}();

var _default = AuthController;
exports["default"] = _default;