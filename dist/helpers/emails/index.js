"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendEmail = exports.sendEmails = exports.setEmail = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("dotenv").config();

var nodemailer = require("nodemailer");

var _require = require("googleapis"),
    google = _require.google;

var OAuth2 = google.auth.OAuth2;
var oAuth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_CLIENT_REDIRECT_URI);
oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_CLIENT_REFRESH_TOKEN
});
var accessToken;

var setAccessToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return oAuth2Client.getAccessToken();

          case 3:
            accessToken = _context.sent;
            _context.next = 9;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", _context.t0);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));

  return function setAccessToken() {
    return _ref.apply(this, arguments);
  };
}();

setAccessToken();
var transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.Email,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_CLIENT_REFRESH_TOKEN,
    accessToken: accessToken
  }
});

var setEmail = function setEmail(sender, receiver, subject, template) {
  var mail = {
    from: sender,
    to: receiver,
    subject: subject,
    html: template
  };
  return mail;
};

exports.setEmail = setEmail;

var sendEmails = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(emails, options) {
    var mails;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return emails.map(function (email) {
              options.to = email;
              transport.sendMail(options);
            });

          case 3:
            mails = _context2.sent;
            _context2.next = 9;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", _context2.t0);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 6]]);
  }));

  return function sendEmails(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.sendEmails = sendEmails;

var sendEmail = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(options) {
    var email;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return transport.sendMail(options);

          case 3:
            email = _context3.sent;
            return _context3.abrupt("return", email);

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", _context3.t0);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function sendEmail(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.sendEmail = sendEmail;