"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendConfEmail = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _confirmEmail = require("./templates/confirmEmail");

var _require = require("googleapis"),
    google = _require.google;

var OAuth2 = google.auth.OAuth2;

_dotenv["default"].config();

var oAuth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_CLIENT_REDIRECT_URI);
oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_CLIENT_REFRESH_TOKEN
});

/*#__PURE__*/
(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  var accessToken;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return oAuth2Client.getAccessToken();

        case 2:
          accessToken = _context.sent;

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));
transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "amaniericus@gmail.com",
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_CLIENT_REFRESH_TOKEN,
    accessToken: accessToken
  }
});
var ConfEmailOptions = {
  from: "amaniericus@gmail.com",
  to: user.email,
  subject: "Confirm Email",
  html: (0, _confirmEmail.confirmEmail)({
    firstName: firstName,
    url: url
  })
};

var SendConfEmail = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _user;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return User.findOne({
              email: req.body.email
            });

          case 2:
            _context3.t0 = _context3.sent;

            if (_context3.t0) {
              _context3.next = 7;
              break;
            }

            _context3.next = 6;
            return User.findOne({
              email: req.body.email
            });

          case 6:
            _context3.t0 = _context3.sent;

          case 7:
            _user = _context3.t0;
            transport.sendMail(ConfEmailOptions, /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(err) {
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        if (!err) {
                          _context2.next = 4;
                          break;
                        }

                        _context2.next = 3;
                        return _user["delete"]();

                      case 3:
                        return _context2.abrupt("return", res.status(500).send({
                          msg: err.message,
                          error: "Sending verification email failed, try again"
                        }));

                      case 4:
                        res.status(200).json({
                          msg: "A verification email has been sent to ".concat(_user.email),
                          email: _user.email,
                          token: token.token
                        });

                      case 5:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x3) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function SendConfEmail(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.SendConfEmail = SendConfEmail;