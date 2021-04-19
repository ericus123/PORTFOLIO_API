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

var UsersController = /*#__PURE__*/function () {
  function UsersController() {
    (0, _classCallCheck2["default"])(this, UsersController);
  }

  (0, _createClass2["default"])(UsersController, null, [{
    key: "getAllUsers",
    value: function () {
      var _getAllUsers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var users;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _User["default"].find({});

              case 2:
                users = _context.sent;
                return _context.abrupt("return", res.status(200).json({
                  users: users
                }));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getAllUsers(_x, _x2) {
        return _getAllUsers.apply(this, arguments);
      }

      return getAllUsers;
    }()
  }, {
    key: "deleteAllUsers",
    value: function () {
      var _deleteAllUsers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var users;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _User["default"].find({});

              case 2:
                users = _context2.sent;
                _context2.next = 5;
                return _User["default"].deleteMany({});

              case 5:
                return _context2.abrupt("return", res.status(200).json({
                  msg: "Users deleted successfully",
                  users: users
                }));

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function deleteAllUsers(_x3, _x4) {
        return _deleteAllUsers.apply(this, arguments);
      }

      return deleteAllUsers;
    }()
  }, {
    key: "deleteUser",
    value: function () {
      var _deleteUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var user;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _User["default"].findOne({
                  email: req.body.email
                });

              case 2:
                user = _context3.sent;

                if (user) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return", res.status(404).json({
                  error: "User not found"
                }));

              case 5:
                _context3.next = 7;
                return user["delete"]();

              case 7:
                return _context3.abrupt("return", res.status(201).json({
                  msg: "User deleted successfuly",
                  user: user
                }));

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function deleteUser(_x5, _x6) {
        return _deleteUser.apply(this, arguments);
      }

      return deleteUser;
    }()
  }, {
    key: "getUser",
    value: function () {
      var _getUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var user;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _User["default"].findOne({
                  email: req.body.email
                });

              case 2:
                user = _context4.sent;

                if (user) {
                  _context4.next = 5;
                  break;
                }

                return _context4.abrupt("return", res.status(400).json({
                  error: "User not found"
                }));

              case 5:
                return _context4.abrupt("return", res.status(200).json({
                  user: user
                }));

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function getUser(_x7, _x8) {
        return _getUser.apply(this, arguments);
      }

      return getUser;
    }()
  }]);
  return UsersController;
}();

var _default = UsersController;
exports["default"] = _default;