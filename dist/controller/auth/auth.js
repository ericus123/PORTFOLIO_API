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

var _PassResetToken = _interopRequireDefault(require("../../model/PassResetToken"));

var _VerificationToken = _interopRequireDefault(require("../../model/VerificationToken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _crypto = _interopRequireDefault(require("crypto"));

var _emails = require("../../helpers/emails");

var _templates = require("../../helpers/emails/templates");

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
                  avatar: login.avatar
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
        var _req$body, username, firstName, lastName, email, password, emailExists, salt, hashedPassword, user, token, url, name;

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
                token = new _VerificationToken["default"]({
                  _userId: user._id,
                  token: _crypto["default"].randomBytes(16).toString("hex")
                });
                _context2.next = 21;
                return token.save();

              case 21:
                url = "".concat(process.env.FRONTEND_URL, "/account/verify/").concat(user._id, "/").concat(token.token);
                name = firstName;
                _context2.next = 25;
                return (0, _emails.sendEmail)((0, _emails.setEmail)(process.env.EMAIL, user.email, "Confirm Email", (0, _templates.confirmEmail)({
                  name: name,
                  url: url
                }))).then(function (result) {
                  return res.status(200).json({
                    msg: "Verification email has been sent to ".concat(email),
                    email: email,
                    token: token
                  });
                })["catch"](function (error) {
                  return res.status(500).json({
                    msg: err.message,
                    error: "Can't send verification email, try again",
                    err: error
                  });
                });

              case 25:
                _context2.next = 30;
                break;

              case 27:
                _context2.prev = 27;
                _context2.t0 = _context2["catch"](2);
                return _context2.abrupt("return", res.status(400).json({
                  err: _context2.t0,
                  error: "Something went wrong"
                }));

              case 30:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 27]]);
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
        var user, token, _token;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                user = req.user;
                token = req.params.token;
                _context3.next = 5;
                return _VerificationToken["default"].findOne({
                  token: token,
                  _userId: user._id
                });

              case 5:
                _token = _context3.sent;

                if (_token) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt("return", res.status(400).json({
                  error: "Invalid token"
                }));

              case 8:
                user.isVerified = true;
                _context3.next = 11;
                return user.save();

              case 11:
                _context3.next = 13;
                return _VerificationToken["default"].deleteMany({
                  where: {
                    _userId: user._id
                  }
                });

              case 13:
                return _context3.abrupt("return", res.status(201).json({
                  msg: "Your account is verified now, please login!"
                }));

              case 16:
                _context3.prev = 16;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", res.status(500).json({
                  error: "Something went wrong, try again",
                  err: _context3.t0
                }));

              case 19:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 16]]);
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
        var user, firstName, email, token, url, name;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                user = req.user;
                firstName = user.firstName, email = user.email;
                token = new _VerificationToken["default"]({
                  _userId: user._id,
                  token: _crypto["default"].randomBytes(16).toString("hex")
                });
                _context4.next = 6;
                return token.save();

              case 6:
                url = "".concat(process.env.FRONTEND_URL, "/account/verify/").concat(user._id, "/").concat(token.token);
                name = firstName;
                _context4.next = 10;
                return (0, _emails.sendEmail)((0, _emails.setEmail)(process.env.EMAIL, user.email, "Confirm Email", (0, _templates.confirmEmail)({
                  name: name,
                  url: url
                }))).then(function (result) {
                  return res.status(200).json({
                    msg: "Verification email has been sent to ".concat(email),
                    email: email,
                    token: token
                  });
                })["catch"](function (error) {
                  return res.status(500).json({
                    msg: err.message,
                    error: "Can't send verification email, try again",
                    err: error
                  });
                });

              case 10:
                _context4.next = 15;
                break;

              case 12:
                _context4.prev = 12;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", res.status(500).json({
                  err: _context4.t0,
                  msg: "Something went wrong"
                }));

              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 12]]);
      }));

      function ResendConfEmail(_x7, _x8) {
        return _ResendConfEmail.apply(this, arguments);
      }

      return ResendConfEmail;
    }()
  }, {
    key: "SendPassResetLink",
    value: function () {
      var _SendPassResetLink = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var user, Token, firstName, email, url;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                user = req.user;
                Token = new _PassResetToken["default"]({
                  _userId: user._id,
                  token: _crypto["default"].randomBytes(16).toString("hex")
                });
                _context5.next = 5;
                return Token.save();

              case 5:
                firstName = user.firstName, email = user.email;
                url = "".concat(process.env.FRONTEND_URL, "/password/reset/").concat(user._id, "/").concat(Token.token);
                _context5.next = 9;
                return (0, _emails.sendEmail)((0, _emails.setEmail)(process.env.EMAIL, user.email, "Reset Password", (0, _templates.resetPassword)({
                  firstName: firstName,
                  url: url
                }))).then(function (result) {
                  return res.status(200).json({
                    msg: "Password reset link has been sent to ".concat(email),
                    email: email,
                    token: Token.token
                  });
                })["catch"](function (error) {
                  return res.status(500).json({
                    msg: err.message,
                    error: "Can't send password reset email, try again",
                    err: error
                  });
                });

              case 9:
                _context5.next = 14;
                break;

              case 11:
                _context5.prev = 11;
                _context5.t0 = _context5["catch"](0);
                return _context5.abrupt("return", res.status(400).json({
                  error: "Something went wrong",
                  err: _context5.t0
                }));

              case 14:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 11]]);
      }));

      function SendPassResetLink(_x9, _x10) {
        return _SendPassResetLink.apply(this, arguments);
      }

      return SendPassResetLink;
    }()
  }, {
    key: "ResetPassword",
    value: function () {
      var _ResetPassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
        var _req$body2, password, passwordConf, token, user, _token, salt, hashedPassword;

        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _req$body2 = req.body, password = _req$body2.password, passwordConf = _req$body2.passwordConf;

                if (!(password !== passwordConf)) {
                  _context6.next = 4;
                  break;
                }

                return _context6.abrupt("return", res.status(400).json({
                  error: "Passwords doesn't match"
                }));

              case 4:
                token = req.params.token;
                user = req.user;
                _context6.next = 8;
                return _PassResetToken["default"].findOne({
                  _userId: user._id,
                  token: token
                });

              case 8:
                _token = _context6.sent;

                if (_token) {
                  _context6.next = 11;
                  break;
                }

                return _context6.abrupt("return", res.status(400).json({
                  error: "Invalid token"
                }));

              case 11:
                _context6.next = 13;
                return _bcryptjs["default"].genSalt(10);

              case 13:
                salt = _context6.sent;
                _context6.next = 16;
                return _bcryptjs["default"].hash(password, salt);

              case 16:
                hashedPassword = _context6.sent;
                _context6.next = 19;
                return user.updateOne({
                  $set: {
                    password: hashedPassword
                  }
                });

              case 19:
                _context6.next = 21;
                return _PassResetToken["default"].deleteMany({
                  _userId: user._id
                });

              case 21:
                return _context6.abrupt("return", res.status(201).json({
                  msg: "Password reset successfuly"
                }));

              case 24:
                _context6.prev = 24;
                _context6.t0 = _context6["catch"](0);
                return _context6.abrupt("return", res.status(400).json({
                  error: "Something went wrong",
                  err: _context6.t0
                }));

              case 27:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 24]]);
      }));

      function ResetPassword(_x11, _x12) {
        return _ResetPassword.apply(this, arguments);
      }

      return ResetPassword;
    }()
  }, {
    key: "CheckLogin",
    value: function () {
      var _CheckLogin = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt("return", res.status(200).json({
                  msg: "User is logged in",
                  user: req.user
                }));

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function CheckLogin(_x13, _x14) {
        return _CheckLogin.apply(this, arguments);
      }

      return CheckLogin;
    }()
  }]);
  return AuthController;
}();

var _default = AuthController;
exports["default"] = _default;