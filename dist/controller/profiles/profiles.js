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

var cloudinary = require("cloudinary").v2;

_dotenv["default"].config();

var uploads = {};
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

var ProfileController = /*#__PURE__*/function () {
  function ProfileController() {
    (0, _classCallCheck2["default"])(this, ProfileController);
  }

  (0, _createClass2["default"])(ProfileController, null, [{
    key: "updateUser",
    value: function () {
      var _updateUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var id, emailExists, user, updatedUser;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = req.user.id; //Check if a user email is already in the database

                _context.next = 3;
                return _User["default"].findOne({
                  email: req.body.email
                });

              case 3:
                emailExists = _context.sent;

                if (!emailExists) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  error: "Email already exists"
                }));

              case 6:
                _context.prev = 6;
                _context.next = 9;
                return _User["default"].findOne({
                  email: req.user.email
                });

              case 9:
                user = _context.sent;

                if (user) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  error: "can't update user"
                }));

              case 12:
                _context.next = 14;
                return user.updateOne({
                  $set: {
                    username: req.body.username,
                    bio: req.body.bio,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName
                  }
                });

              case 14:
                _context.next = 16;
                return _User["default"].find({
                  email: req.user.email
                });

              case 16:
                updatedUser = _context.sent;
                res.status(201).json({
                  msg: "user updated successfuly",
                  user: updatedUser
                });
                _context.next = 23;
                break;

              case 20:
                _context.prev = 20;
                _context.t0 = _context["catch"](6);
                res.status(400).json({
                  error: "failed to update profile"
                });

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[6, 20]]);
      }));

      function updateUser(_x, _x2) {
        return _updateUser.apply(this, arguments);
      }

      return updateUser;
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

                return _context2.abrupt("return", res.status(400).json({
                  error: "cant't find user"
                }));

              case 6:
                res.status(200).json({
                  profile: user
                });
                _context2.next = 12;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](0);
                res.status(400).json({
                  error: "error retrieving user"
                });

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
        var user, fileStr, uploadResponse, updatedUser;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _User["default"].findOne({
                  _id: req.user.id
                });

              case 3:
                user = _context3.sent;

                if (!user) {
                  res.status(400).json({
                    error: "User doesn't exist"
                  });
                }

                if (user.imageUrl != null && user.bio != null) {
                  res.status(400).json({
                    error: "Your profile is already complete"
                  });
                }

                fileStr = req.body.img;
                _context3.next = 9;
                return cloudinary.uploader.upload(fileStr);

              case 9:
                uploadResponse = _context3.sent;
                _context3.next = 12;
                return user.updateOne({
                  $set: {
                    bio: req.body.bio,
                    imageUrl: uploadResponse.url
                  }
                });

              case 12:
                updatedUser = _context3.sent;
                res.status(201).json({
                  msg: "Profile completed successfuly"
                });
                _context3.next = 19;
                break;

              case 16:
                _context3.prev = 16;
                _context3.t0 = _context3["catch"](0);
                res.status(400).json({
                  error: "Error occured",
                  err: _context3.t0
                });

              case 19:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 16]]);
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
                _context4.next = 2;
                return _User["default"].findOne({
                  email: req.user.email
                });

              case 2:
                user = _context4.sent;

                if (user) {
                  _context4.next = 5;
                  break;
                }

                return _context4.abrupt("return", res.status(400).json({
                  error: "can't find user"
                }));

              case 5:
                _context4.next = 7;
                return user["delete"]();

              case 7:
                res.status(201).json({
                  msg: "account deleted successfuly"
                });

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
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