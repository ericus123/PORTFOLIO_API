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

var UserRoles = /*#__PURE__*/function () {
  function UserRoles() {
    (0, _classCallCheck2["default"])(this, UserRoles);
  }

  (0, _createClass2["default"])(UserRoles, null, [{
    key: "assignRoles",
    value: function () {
      var _assignRoles = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var user, assignedUser;
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

                return _context.abrupt("return", res.status(404).json({
                  error: "User not found"
                }));

              case 5:
                _context.next = 7;
                return user.updateOne({
                  role: req.body.role
                });

              case 7:
                assignedUser = _context.sent;
                return _context.abrupt("return", res.status(201).json({
                  msg: "Role assigned successfuly",
                  user: assignedUser
                }));

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function assignRoles(_x, _x2) {
        return _assignRoles.apply(this, arguments);
      }

      return assignRoles;
    }()
  }]);
  return UserRoles;
}();

var _default = UserRoles;
exports["default"] = _default;