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

var _dotenv = _interopRequireDefault(require("dotenv"));

var _index = require("../../helpers/images/index");

_dotenv["default"].config();

var ProfileController = /*#__PURE__*/function () {
  function ProfileController() {
    (0, _classCallCheck2["default"])(this, ProfileController);
  }

  (0, _createClass2["default"])(ProfileController, null, [{
    key: "updateProfile",
    value: function () {
      var _updateProfile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var id, user, _req$body, username, bio, firstName, lastName, img, uploaded_image, updatedUser;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = req.user.id;
                _context.prev = 1;
                _context.next = 4;
                return _User["default"].findOne({
                  email: req.user.email
                });

              case 4:
                user = _context.sent;

                if (user) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", res.status(404).json({
                  error: "User not found"
                }));

              case 7:
                if (user.isComplete) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  error: "Please complete your profile first"
                }));

              case 9:
                _req$body = req.body, username = _req$body.username, bio = _req$body.bio, firstName = _req$body.firstName, lastName = _req$body.lastName, img = _req$body.img;
                _context.next = 12;
                return (0, _index.uploadImage)(img, "/Users/Avatars");

              case 12:
                uploaded_image = _context.sent;
                _context.next = 15;
                return (0, _index.deleteImage)(user.avatar_public_id);

              case 15:
                _context.next = 17;
                return user.updateOne({
                  $set: {
                    username: username,
                    bio: bio,
                    firstName: firstName,
                    lastName: lastName,
                    avatar: uploaded_image.secure_url,
                    avatar_public_id: uploaded_image.public_id
                  }
                });

              case 17:
                _context.next = 19;
                return _User["default"].find({
                  email: req.user.email
                });

              case 19:
                updatedUser = _context.sent;
                return _context.abrupt("return", res.status(201).json({
                  msg: "Profile updated successfuly",
                  user: updatedUser
                }));

              case 23:
                _context.prev = 23;
                _context.t0 = _context["catch"](1);
                return _context.abrupt("return", res.status(400).json({
                  error: "Failed to update profile",
                  err: _context.t0
                }));

              case 26:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 23]]);
      }));

      function updateProfile(_x, _x2) {
        return _updateProfile.apply(this, arguments);
      }

      return updateProfile;
    }()
  }, {
    key: "viewProfile",
    value: function () {
      var _viewProfile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var user;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _User["default"].find({
                  email: req.user.email
                }).populate("posts");

              case 3:
                user = _context2.sent;

                if (user) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", res.status(404).json({
                  error: "Profile not found"
                }));

              case 6:
                return _context2.abrupt("return", res.status(200).json({
                  profile: user
                }));

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(400).json({
                  error: "Something went wrong, try again"
                }));

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 9]]);
      }));

      function viewProfile(_x3, _x4) {
        return _viewProfile.apply(this, arguments);
      }

      return viewProfile;
    }()
  }, {
    key: "completeProfile",
    value: function () {
      var _completeProfile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var _req$body2, bio, img, uploaded_image, updatedUser;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _req$body2 = req.body, bio = _req$body2.bio, img = _req$body2.img;
                _context3.next = 4;
                return (0, _index.uploadImage)(img, "/Users/Avatars");

              case 4:
                uploaded_image = _context3.sent;
                _context3.next = 7;
                return req.profile.updateOne({
                  $set: {
                    bio: bio,
                    avatar: uploaded_image.secure_url,
                    avatar_public_id: uploaded_image.public_id,
                    isComplete: true
                  }
                });

              case 7:
                updatedUser = _context3.sent;
                return _context3.abrupt("return", res.status(201).json({
                  msg: "Profile completed successfuly"
                }));

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", res.status(400).json({
                  error: "Something went wrong",
                  err: _context3.t0
                }));

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 11]]);
      }));

      function completeProfile(_x5, _x6) {
        return _completeProfile.apply(this, arguments);
      }

      return completeProfile;
    }()
  }, {
    key: "deleteAccount",
    value: function () {
      var _deleteAccount = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var user;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _User["default"].findOne({
                  email: req.user.email
                });

              case 3:
                user = _context4.sent;

                if (user) {
                  _context4.next = 6;
                  break;
                }

                return _context4.abrupt("return", res.status(404).json({
                  error: "User not found"
                }));

              case 6:
                _context4.next = 8;
                return user["delete"]();

              case 8:
                _context4.next = 10;
                return (0, _index.deleteImage)(user.avatar_public_id);

              case 10:
                return _context4.abrupt("return", res.status(201).json({
                  msg: "Account deleted successfuly"
                }));

              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", res.status(500).json({
                  error: "Something went wrong",
                  err: _context4.t0
                }));

              case 16:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 13]]);
      }));

      function deleteAccount(_x7, _x8) {
        return _deleteAccount.apply(this, arguments);
      }

      return deleteAccount;
    }()
  }]);
  return ProfileController;
}();

var _default = ProfileController;
exports["default"] = _default;