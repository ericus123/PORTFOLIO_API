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

var _CommentReplies = _interopRequireDefault(require("../model/CommentReplies"));

var PostsMiddleware = /*#__PURE__*/function () {
  function PostsMiddleware() {
    (0, _classCallCheck2["default"])(this, PostsMiddleware);
  }

  (0, _createClass2["default"])(PostsMiddleware, null, [{
    key: "checkPostComment",
    value: function () {
      var _checkPostComment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        var post, comment;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Post["default"].findOne({
                  _id: req.params.postId
                });

              case 2:
                post = _context.sent;
                _context.next = 5;
                return _Comments["default"].findById(req.params.commentId);

              case 5:
                comment = _context.sent;
                if (!post) res.status(400).json({
                  error: "Post doesn't exist"
                });
                if (!comment) res.status(400).json({
                  error: "Comment doesn't exist"
                });
                next();

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
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
                if (req.method = "PATCH" && comment.user._id != req.user.id) {
                  res.status(401).json({
                    error: "Unauthorized request"
                  });
                }

                next();

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
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
    key: "checkPostReaction",
    value: function () {
      var _checkPostReaction = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
        var post;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _Post["default"].findById(req.params.postId);

              case 2:
                post = _context4.sent;

                if (post) {
                  _context4.next = 5;
                  break;
                }

                return _context4.abrupt("return", res.status(400).json({
                  error: "Post doesn't exist"
                }));

              case 5:
                next();

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function checkPostReaction(_x10, _x11, _x12) {
        return _checkPostReaction.apply(this, arguments);
      }

      return checkPostReaction;
    }()
  }]);
  return PostsMiddleware;
}();

var _default = PostsMiddleware;
exports["default"] = _default;