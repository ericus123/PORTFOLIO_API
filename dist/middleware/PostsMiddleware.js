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

var _Post = _interopRequireDefault(require("../model/Post"));

var _Comments = _interopRequireDefault(require("../model/Comments"));

var _Category = _interopRequireDefault(require("../model/Category"));

var _CommentReplies = _interopRequireDefault(require("../model/CommentReplies"));

var _crypto = _interopRequireDefault(require("crypto"));

var PostsMiddleware = /*#__PURE__*/function () {
  function PostsMiddleware() {
    (0, _classCallCheck2["default"])(this, PostsMiddleware);
  }

  (0, _createClass2["default"])(PostsMiddleware, null, [{
    key: "checkPostComment",
    value: function () {
      var _checkPostComment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        var post, _comment;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _Post["default"].findOne({
                  _id: req.params.postId
                });

              case 3:
                post = _context.sent;
                _context.next = 6;
                return _Comments["default"].findById(req.params.commentId);

              case 6:
                _comment = _context.sent;
                if (!post) res.status(400).json({
                  error: "Post doesn't exist"
                });
                if (!_comment) res.status(400).json({
                  error: "Comment doesn't exist"
                });
                next();
                _context.next = 15;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(400).json({
                  error: "Something went wrong"
                }));

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 12]]);
      }));

      function checkPostComment(_x, _x2, _x3) {
        return _checkPostComment.apply(this, arguments);
      }

      return checkPostComment;
    }()
  }, {
    key: "checkOwner",
    value: function () {
      var _checkOwner = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;

                if (req.method = "PATCH" && comment.user._id != req.user.id) {
                  res.status(401).json({
                    error: "Unauthorized request"
                  });
                }

                next();
                _context2.next = 8;
                break;

              case 5:
                _context2.prev = 5;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(400).json({
                  error: "Something went wrong"
                }));

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 5]]);
      }));

      function checkOwner(_x4, _x5, _x6) {
        return _checkOwner.apply(this, arguments);
      }

      return checkOwner;
    }()
  }, {
    key: "checkPostCommentReply",
    value: function () {
      var _checkPostCommentReply = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
        var commentReply;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _CommentReplies["default"].findById(req.params.replyId);

              case 2:
                commentReply = _context3.sent;

                if (commentReply) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return", res.status(404).json({
                  error: "Reply not found"
                }));

              case 5:
                if (!(commentReply.user._id != req.user.id)) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return", res.status(401).json({
                  error: "Unauthorized request"
                }));

              case 7:
                next();

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function checkPostCommentReply(_x7, _x8, _x9) {
        return _checkPostCommentReply.apply(this, arguments);
      }

      return checkPostCommentReply;
    }()
  }, {
    key: "postExist",
    value: function () {
      var _postExist = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
        var post;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _Post["default"].findById(req.params.postId);

              case 3:
                post = _context4.sent;

                if (post) {
                  _context4.next = 6;
                  break;
                }

                return _context4.abrupt("return", res.status(404).json({
                  error: "Post not found"
                }));

              case 6:
                next();
                _context4.next = 12;
                break;

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", res.status(400).json({
                  error: "Something went wrong"
                }));

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 9]]);
      }));

      function postExist(_x10, _x11, _x12) {
        return _postExist.apply(this, arguments);
      }

      return postExist;
    }()
  }, {
    key: "commentExist",
    value: function () {
      var _commentExist = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
        var _comment2;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _Comments["default"].findById(req.params.commentId);

              case 3:
                _comment2 = _context5.sent;

                if (_comment2) {
                  _context5.next = 6;
                  break;
                }

                return _context5.abrupt("return", res.status(404).json({
                  error: "Comment not found"
                }));

              case 6:
                next();
                _context5.next = 12;
                break;

              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5["catch"](0);
                return _context5.abrupt("return", res.status(400).json({
                  error: "Something went wrong"
                }));

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 9]]);
      }));

      function commentExist(_x13, _x14, _x15) {
        return _commentExist.apply(this, arguments);
      }

      return commentExist;
    }()
  }, {
    key: "replyExist",
    value: function () {
      var _replyExist = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
        var reply;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return _CommentReplies["default"].findById(req.params.replyId);

              case 3:
                reply = _context6.sent;

                if (reply) {
                  _context6.next = 6;
                  break;
                }

                return _context6.abrupt("return", res.status(404).json({
                  error: "Post not found"
                }));

              case 6:
                next();
                _context6.next = 12;
                break;

              case 9:
                _context6.prev = 9;
                _context6.t0 = _context6["catch"](0);
                return _context6.abrupt("return", res.status(400).json({
                  error: "Something went wrong"
                }));

              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 9]]);
      }));

      function replyExist(_x16, _x17, _x18) {
        return _replyExist.apply(this, arguments);
      }

      return replyExist;
    }()
  }, {
    key: "checkCategory",
    value: function () {
      var _checkCategory = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
        var category;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return _Category["default"].findOne({
                  name: req.body.name
                });

              case 3:
                category = _context7.sent;

                if (!category) {
                  _context7.next = 6;
                  break;
                }

                return _context7.abrupt("return", res.status(400).json({
                  error: "Name already exist"
                }));

              case 6:
                next();
                _context7.next = 12;
                break;

              case 9:
                _context7.prev = 9;
                _context7.t0 = _context7["catch"](0);
                return _context7.abrupt("return", res.status(400).json({
                  error: "Something went wrong"
                }));

              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 9]]);
      }));

      function checkCategory(_x19, _x20, _x21) {
        return _checkCategory.apply(this, arguments);
      }

      return checkCategory;
    }()
  }, {
    key: "checkCategoryUpdate",
    value: function () {
      var _checkCategoryUpdate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
        var category;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _context8.next = 3;
                return _Category["default"].findOne({
                  _id: req.params.category
                });

              case 3:
                category = _context8.sent;

                if (category) {
                  _context8.next = 6;
                  break;
                }

                return _context8.abrupt("return", res.status(404).json({
                  error: "Category not found"
                }));

              case 6:
                next();
                _context8.next = 12;
                break;

              case 9:
                _context8.prev = 9;
                _context8.t0 = _context8["catch"](0);
                return _context8.abrupt("return", res.status(400).json({
                  error: "Something went wrong"
                }));

              case 12:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[0, 9]]);
      }));

      function checkCategoryUpdate(_x22, _x23, _x24) {
        return _checkCategoryUpdate.apply(this, arguments);
      }

      return checkCategoryUpdate;
    }()
  }, {
    key: "checkCatCreation",
    value: function () {
      var _checkCatCreation = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res, next) {
        var category;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return _Category["default"].findOne({
                  name: req.body.name
                });

              case 3:
                category = _context9.sent;

                if (!category) {
                  _context9.next = 6;
                  break;
                }

                return _context9.abrupt("return", res.status(400).json({
                  error: "Category name already exist"
                }));

              case 6:
                next();
                _context9.next = 12;
                break;

              case 9:
                _context9.prev = 9;
                _context9.t0 = _context9["catch"](0);
                return _context9.abrupt("return", res.status(400).json({
                  error: "Something went wrong"
                }));

              case 12:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[0, 9]]);
      }));

      function checkCatCreation(_x25, _x26, _x27) {
        return _checkCatCreation.apply(this, arguments);
      }

      return checkCatCreation;
    }()
  }, {
    key: "checkPostTitle",
    value: function () {
      var _checkPostTitle = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res, next) {
        var title, post;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                title = req.body.title;
                _context10.next = 4;
                return _Post["default"].findOne({
                  title: title
                });

              case 4:
                post = _context10.sent;

                if (post) {
                  title = title.concat("-" + _crypto["default"].randomBytes(1).toString("hex"));
                }

                req.title = title;
                next();
                _context10.next = 13;
                break;

              case 10:
                _context10.prev = 10;
                _context10.t0 = _context10["catch"](0);
                return _context10.abrupt("return", res.status(400).json({
                  error: "Something went wrong"
                }));

              case 13:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[0, 10]]);
      }));

      function checkPostTitle(_x28, _x29, _x30) {
        return _checkPostTitle.apply(this, arguments);
      }

      return checkPostTitle;
    }()
  }]);
  return PostsMiddleware;
}();

var _default = PostsMiddleware;
exports["default"] = _default;