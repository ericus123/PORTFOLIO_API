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

var _Post = _interopRequireDefault(require("../../model/Post"));

var _Comments = _interopRequireDefault(require("../../model/Comments"));

var _CommentReplies = _interopRequireDefault(require("../../model/CommentReplies"));

var _CommentLikes = _interopRequireDefault(require("../../model/CommentLikes"));

var _CommentUnlikes = _interopRequireDefault(require("../../model/CommentUnlikes"));

var _User = _interopRequireDefault(require("../../model/User"));

var _PostLikes = _interopRequireDefault(require("../../model/PostLikes"));

var _PostUnLikes = _interopRequireDefault(require("../../model/PostUnLikes"));

var _Category = _interopRequireDefault(require("../../model/Category"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _CommentReplyLikes = _interopRequireDefault(require("../../model/CommentReplyLikes"));

var _CommentReplyUnlikes = _interopRequireDefault(require("../../model/CommentReplyUnlikes"));

var _BlogVideos = _interopRequireDefault(require("../../model/BlogVideos"));

var _jwPaginate = _interopRequireDefault(require("jw-paginate"));

var cloudinary = require("cloudinary").v2;

_dotenv["default"].config();

var uploads = {};
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

var PostController = /*#__PURE__*/function () {
  function PostController() {
    (0, _classCallCheck2["default"])(this, PostController);
  }

  (0, _createClass2["default"])(PostController, null, [{
    key: "createPost",
    value: function () {
      var _createPost = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var fileStr, uploadResponse, _post, savedPost;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                fileStr = req.body.img;
                _context.next = 4;
                return cloudinary.uploader.upload(fileStr);

              case 4:
                uploadResponse = _context.sent;
                _post = new _Post["default"]({
                  title: req.body.title,
                  description: req.body.description,
                  author: "amani",
                  category: req.body.category,
                  imageUrl: uploadResponse.url
                });
                _context.next = 8;
                return _post.save();

              case 8:
                savedPost = _context.sent;
                _context.next = 11;
                return _User["default"].findByIdAndUpdate(req.user.id, {
                  $push: {
                    posts: savedPost._id
                  }
                }, {
                  "new": true,
                  useFindAndModify: false
                });

              case 11:
                res.status(201).json({
                  message: "post created succesfully",
                  article: savedPost
                });
                _context.next = 17;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](0);
                res.status(500).json({
                  err: "Something went wrong",
                  error: _context.t0
                });

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 14]]);
      }));

      function createPost(_x, _x2) {
        return _createPost.apply(this, arguments);
      }

      return createPost;
    }()
  }, {
    key: "getPosts",
    value: function () {
      var _getPosts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var page, limit, startIndex, endIndex, results, i, all;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                page = parseInt(req.query.page);
                limit = parseInt(req.query.limit);
                startIndex = (page - 1) * limit;
                endIndex = page * limit;
                results = {};
                _context2.t0 = endIndex;
                _context2.next = 9;
                return _Post["default"].countDocuments().exec();

              case 9:
                _context2.t1 = _context2.sent;

                if (!(_context2.t0 < _context2.t1)) {
                  _context2.next = 14;
                  break;
                }

                results.next = {
                  page: page + 1,
                  limit: limit
                };
                _context2.next = 15;
                break;

              case 14:
                results.next = {
                  page: null,
                  limit: limit
                };

              case 15:
                results.previous = [];

                for (i = 0; i < 2; i++) {
                  if (startIndex > 0) {
                    results.previous.push(page - 1);
                  }
                } // else {
                //   results.previous = {
                //     page: null,
                //     limit: limit,
                //   };
                // }


                _context2.next = 19;
                return _Post["default"].find({}).sort({
                  date: -1
                });

              case 19:
                all = _context2.sent;
                results.maxPages = Math.ceil(all.length / limit);
                _context2.next = 23;
                return _Post["default"].find().sort({
                  date: -1
                }).limit(limit).skip(startIndex).exec();

              case 23:
                results.results = _context2.sent;
                res.status(200).json({
                  msg: "Posts fetched successfuly",
                  postsPerPage: results,
                  posts: all
                });
                next();
                _context2.next = 31;
                break;

              case 28:
                _context2.prev = 28;
                _context2.t2 = _context2["catch"](0);
                res.status(500).json({
                  error: "Something went wrong",
                  err: _context2.t2
                });

              case 31:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 28]]);
      }));

      function getPosts(_x3, _x4) {
        return _getPosts.apply(this, arguments);
      }

      return getPosts;
    }()
  }, {
    key: "getPost",
    value: function () {
      var _getPost = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var id, singlepost;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = req.params.id;
                _context3.prev = 1;
                _context3.next = 4;
                return _Post["default"].findById(id).populate([{
                  path: "comments",
                  populate: {
                    path: "replies"
                  }
                }, "likes", "unLikes"]);

              case 4:
                singlepost = _context3.sent;
                res.status(200).json({
                  msg: "Post retrieved successfuly",
                  post: singlepost
                });
                _context3.next = 11;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](1);
                res.status(400).json({
                  error: "Something went wrong",
                  err: _context3.t0
                });

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 8]]);
      }));

      function getPost(_x5, _x6) {
        return _getPost.apply(this, arguments);
      }

      return getPost;
    }()
  }, {
    key: "updatePost",
    value: function () {
      var _updatePost = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var id, _post2, updatedPost;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = req.params.id;
                _context4.prev = 1;
                _context4.next = 4;
                return _Post["default"].findOne({
                  _id: id
                });

              case 4:
                _post2 = _context4.sent;

                if (_post2) {
                  _context4.next = 7;
                  break;
                }

                return _context4.abrupt("return", res.status(400).json({
                  error: "Can't find post"
                }));

              case 7:
                _context4.next = 9;
                return _post2.updateOne({
                  $set: {
                    title: req.body.title,
                    description: req.body.description,
                    category: req.body.category,
                    imageUrl: req.body.url
                  }
                });

              case 9:
                _context4.next = 11;
                return _Post["default"].findOne({
                  _id: id
                });

              case 11:
                updatedPost = _context4.sent;
                res.status(201).json({
                  message: "Post updated successfully",
                  post: updatedPost
                });
                _context4.next = 18;
                break;

              case 15:
                _context4.prev = 15;
                _context4.t0 = _context4["catch"](1);
                res.status(400).json({
                  error: "Can't update post"
                });

              case 18:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 15]]);
      }));

      function updatePost(_x7, _x8) {
        return _updatePost.apply(this, arguments);
      }

      return updatePost;
    }()
  }, {
    key: "deletePost",
    value: function () {
      var _deletePost = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var _post3;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _Post["default"].findOne({
                  _id: req.params.id
                });

              case 3:
                _post3 = _context5.sent;

                if (_post3) {
                  _context5.next = 6;
                  break;
                }

                return _context5.abrupt("return", res.status(400).json({
                  error: "Can't find the post"
                }));

              case 6:
                _context5.next = 8;
                return _post3.deleteOne();

              case 8:
                res.status(201).json({
                  message: "Post deleted successfully !"
                });
                _context5.next = 14;
                break;

              case 11:
                _context5.prev = 11;
                _context5.t0 = _context5["catch"](0);
                res.status(400).json({
                  error: "Can't delete post",
                  post: post
                });

              case 14:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 11]]);
      }));

      function deletePost(_x9, _x10) {
        return _deletePost.apply(this, arguments);
      }

      return deletePost;
    }()
  }, {
    key: "getPostsByCategory",
    value: function () {
      var _getPostsByCategory = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
        var category, posts;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return _Category["default"].find({
                  name: req.params.category
                });

              case 3:
                category = _context6.sent;

                if (category) {
                  _context6.next = 6;
                  break;
                }

                return _context6.abrupt("return", res.status(400).json({
                  error: "Category not found"
                }));

              case 6:
                _context6.next = 8;
                return _Post["default"].find({
                  category: req.params.category
                });

              case 8:
                posts = _context6.sent;

                if (posts) {
                  _context6.next = 11;
                  break;
                }

                return _context6.abrupt("return", res.status(400).json({
                  error: "No results found!"
                }));

              case 11:
                res.status(200).json({
                  message: "Posts retrieved successfuly",
                  posts: posts
                });
                _context6.next = 17;
                break;

              case 14:
                _context6.prev = 14;
                _context6.t0 = _context6["catch"](0);
                res.status(400).json({
                  error: "Can't find posts with that category"
                });

              case 17:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 14]]);
      }));

      function getPostsByCategory(_x11, _x12) {
        return _getPostsByCategory.apply(this, arguments);
      }

      return getPostsByCategory;
    }()
  }, {
    key: "createPostCat",
    value: function () {
      var _createPostCat = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
        var cat;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                cat = new _Category["default"]({
                  name: req.body.name,
                  description: req.body.description
                });
                _context7.prev = 1;
                _context7.next = 4;
                return cat.save();

              case 4:
                res.status(201).json({
                  msg: "Category is created successfuly",
                  category: cat
                });
                _context7.next = 10;
                break;

              case 7:
                _context7.prev = 7;
                _context7.t0 = _context7["catch"](1);
                res.status(400).json({
                  error: "Failed to create category"
                });

              case 10:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[1, 7]]);
      }));

      function createPostCat(_x13, _x14) {
        return _createPostCat.apply(this, arguments);
      }

      return createPostCat;
    }()
  }, {
    key: "getPostCats",
    value: function () {
      var _getPostCats = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
        var categories;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _context8.next = 3;
                return _Category["default"].find({});

              case 3:
                categories = _context8.sent;

                if (categories) {
                  _context8.next = 6;
                  break;
                }

                return _context8.abrupt("return", res.status(400).json({
                  error: "Failed to get categories"
                }));

              case 6:
                res.status(200).json({
                  msg: "Post categories retrieved successfuly",
                  categories: categories
                });
                _context8.next = 12;
                break;

              case 9:
                _context8.prev = 9;
                _context8.t0 = _context8["catch"](0);
                res.status(400).json({
                  error: "Failed to get post category"
                });

              case 12:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[0, 9]]);
      }));

      function getPostCats(_x15, _x16) {
        return _getPostCats.apply(this, arguments);
      }

      return getPostCats;
    }()
  }, {
    key: "postComment",
    value: function () {
      var _postComment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
        var user, comment, savedComment, id, _post4;

        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return _User["default"].findById(req.user.id);

              case 2:
                user = _context9.sent;
                comment = new _Comments["default"]({
                  description: req.body.description,
                  user: user
                });
                _context9.prev = 4;
                _context9.next = 7;
                return comment.save();

              case 7:
                savedComment = _context9.sent;
                id = savedComment._id;
                _context9.next = 11;
                return _Post["default"].findByIdAndUpdate(req.params.postId, {
                  $push: {
                    comments: savedComment._id
                  }
                }, {
                  "new": true,
                  useFindAndModify: false
                });

              case 11:
                _context9.next = 13;
                return _Post["default"].findById(req.params.postId).populate("comments");

              case 13:
                _post4 = _context9.sent;
                res.status(201).json({
                  msg: "Comment saved!",
                  comment: savedComment
                });
                _context9.next = 20;
                break;

              case 17:
                _context9.prev = 17;
                _context9.t0 = _context9["catch"](4);
                res.status(400).json({
                  error: "Failed to create comment",
                  err: _context9.t0
                });

              case 20:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[4, 17]]);
      }));

      function postComment(_x17, _x18) {
        return _postComment.apply(this, arguments);
      }

      return postComment;
    }()
  }, {
    key: "deleteComment",
    value: function () {
      var _deleteComment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                _context10.next = 3;
                return _Comments["default"].findOneAndDelete({
                  _id: req.params.commentId
                }, {
                  useFindAndModify: false
                });

              case 3:
                res.status(201).json({
                  msg: "Deleted comment"
                });
                _context10.next = 9;
                break;

              case 6:
                _context10.prev = 6;
                _context10.t0 = _context10["catch"](0);
                res.status(400).json({
                  error: "Error occured"
                });

              case 9:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[0, 6]]);
      }));

      function deleteComment(_x19, _x20) {
        return _deleteComment.apply(this, arguments);
      }

      return deleteComment;
    }()
  }, {
    key: "editComment",
    value: function () {
      var _editComment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                _context11.next = 3;
                return _Comments["default"].findByIdAndUpdate(req.params.commentId, {
                  $set: {
                    description: req.body.description
                  }
                }, {
                  useFindAndModify: false
                });

              case 3:
                res.status(201).json({
                  msg: "Edited comment "
                });
                _context11.next = 9;
                break;

              case 6:
                _context11.prev = 6;
                _context11.t0 = _context11["catch"](0);
                res.status(400).json({
                  error: "Error occured"
                });

              case 9:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, null, [[0, 6]]);
      }));

      function editComment(_x21, _x22) {
        return _editComment.apply(this, arguments);
      }

      return editComment;
    }()
  }, {
    key: "editCommentReply",
    value: function () {
      var _editCommentReply = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.prev = 0;
                _context12.next = 3;
                return _CommentReplies["default"].findByIdAndUpdate(req.params.commentReplyId, {
                  $set: {
                    description: req.body.description
                  }
                }, {
                  useFindAndModify: false
                });

              case 3:
                res.status(201).json({
                  msg: "Edited reply"
                });
                _context12.next = 9;
                break;

              case 6:
                _context12.prev = 6;
                _context12.t0 = _context12["catch"](0);
                res.status(400).json({
                  error: "Error occured"
                });

              case 9:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, null, [[0, 6]]);
      }));

      function editCommentReply(_x23, _x24) {
        return _editCommentReply.apply(this, arguments);
      }

      return editCommentReply;
    }()
  }, {
    key: "postCommentReply",
    value: function () {
      var _postCommentReply = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
        var user, commentReply, savedReply, id;
        return _regenerator["default"].wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.prev = 0;
                _context13.next = 3;
                return _User["default"].findById(req.user.id);

              case 3:
                user = _context13.sent;
                commentReply = new _CommentReplies["default"]({
                  description: req.body.description,
                  user: user
                });
                _context13.next = 7;
                return commentReply.save();

              case 7:
                savedReply = _context13.sent;
                id = savedReply._id;
                _context13.next = 11;
                return _Comments["default"].findByIdAndUpdate(req.params.commentId, {
                  $push: {
                    replies: savedReply._id
                  }
                }, {
                  "new": true,
                  useFindAndModify: false
                });

              case 11:
                res.status(201).json({
                  msg: "Reply saved!",
                  reply: savedReply,
                  commentId: req.params.commentId
                });
                _context13.next = 17;
                break;

              case 14:
                _context13.prev = 14;
                _context13.t0 = _context13["catch"](0);
                res.status(400).json({
                  error: "Failed to reply",
                  err: _context13.t0,
                  commentId: req.params.commentId
                });

              case 17:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, null, [[0, 14]]);
      }));

      function postCommentReply(_x25, _x26) {
        return _postCommentReply.apply(this, arguments);
      }

      return postCommentReply;
    }()
  }, {
    key: "deleteCommentReply",
    value: function () {
      var _deleteCommentReply = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res) {
        return _regenerator["default"].wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.prev = 0;
                _context14.next = 3;
                return _CommentReplies["default"].findOneAndDelete({
                  _id: req.params.commentReplyId
                }, {
                  useFindAndModify: false
                });

              case 3:
                res.status(201).json({
                  msg: "Deleted reply"
                });
                _context14.next = 9;
                break;

              case 6:
                _context14.prev = 6;
                _context14.t0 = _context14["catch"](0);
                res.status(400).json({
                  error: "Error occured"
                });

              case 9:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, null, [[0, 6]]);
      }));

      function deleteCommentReply(_x27, _x28) {
        return _deleteCommentReply.apply(this, arguments);
      }

      return deleteCommentReply;
    }()
  }, {
    key: "reactToThePostComment",
    value: function () {
      var _reactToThePostComment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(req, res) {
        var user, like, unlike, _action, saveLike, saveUnlike, hasLiked, hasUnLiked;

        return _regenerator["default"].wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.next = 2;
                return _User["default"].findById(req.user.id);

              case 2:
                user = _context17.sent;
                like = new _CommentLikes["default"]({
                  user: user,
                  userId: req.user.id
                });
                unlike = new _CommentUnlikes["default"]({
                  user: user,
                  userId: req.user.id
                });
                _context17.prev = 5;
                _action = req.params.action;

                saveLike = /*#__PURE__*/function () {
                  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
                    var savedLike, id, savedComment;
                    return _regenerator["default"].wrap(function _callee15$(_context15) {
                      while (1) {
                        switch (_context15.prev = _context15.next) {
                          case 0:
                            _context15.next = 2;
                            return like.save();

                          case 2:
                            savedLike = _context15.sent;
                            id = savedLike._id;
                            _context15.next = 6;
                            return _Comments["default"].findByIdAndUpdate(req.params.commentId, {
                              $push: {
                                likes: savedLike._id
                              }
                            }, {
                              "new": true,
                              useFindAndModify: false
                            });

                          case 6:
                            savedComment = _context15.sent;
                            res.status(201).json({
                              msg: "liked!",
                              like: savedLike
                            });

                          case 8:
                          case "end":
                            return _context15.stop();
                        }
                      }
                    }, _callee15);
                  }));

                  return function saveLike() {
                    return _ref.apply(this, arguments);
                  };
                }();

                saveUnlike = /*#__PURE__*/function () {
                  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
                    var savedUnLike, id;
                    return _regenerator["default"].wrap(function _callee16$(_context16) {
                      while (1) {
                        switch (_context16.prev = _context16.next) {
                          case 0:
                            _context16.next = 2;
                            return unlike.save();

                          case 2:
                            savedUnLike = _context16.sent;
                            id = savedUnLike._id;
                            _context16.next = 6;
                            return _Comments["default"].findByIdAndUpdate(req.params.commentId, {
                              $push: {
                                unLikes: savedUnLike._id
                              }
                            }, {
                              "new": true,
                              useFindAndModify: false
                            });

                          case 6:
                            res.status(201).json({
                              msg: "unliked!",
                              unlike: savedUnLike
                            });

                          case 7:
                          case "end":
                            return _context16.stop();
                        }
                      }
                    }, _callee16);
                  }));

                  return function saveUnlike() {
                    return _ref2.apply(this, arguments);
                  };
                }();

                _context17.next = 11;
                return _CommentLikes["default"].findOne({
                  userId: req.user.id
                });

              case 11:
                hasLiked = _context17.sent;
                _context17.next = 14;
                return _CommentUnlikes["default"].findOne({
                  userId: req.user.id
                });

              case 14:
                hasUnLiked = _context17.sent;

                if (!(_action == "like")) {
                  _context17.next = 31;
                  break;
                }

                if (!hasLiked) {
                  _context17.next = 22;
                  break;
                }

                _context17.next = 19;
                return _CommentLikes["default"].deleteOne({
                  userId: req.user.id
                });

              case 19:
                return _context17.abrupt("return", res.status(201).json({
                  msg: "Removed like"
                }));

              case 22:
                if (!hasUnLiked) {
                  _context17.next = 28;
                  break;
                }

                _context17.next = 25;
                return _CommentUnlikes["default"].deleteOne({
                  userId: req.user.id
                });

              case 25:
                saveLike();
                _context17.next = 29;
                break;

              case 28:
                saveLike();

              case 29:
                _context17.next = 48;
                break;

              case 31:
                if (!(_action == "unlike")) {
                  _context17.next = 47;
                  break;
                }

                if (!hasLiked) {
                  _context17.next = 38;
                  break;
                }

                _context17.next = 35;
                return _CommentLikes["default"].deleteOne({
                  userId: req.user.id
                });

              case 35:
                saveUnlike();
                _context17.next = 45;
                break;

              case 38:
                if (!hasUnLiked) {
                  _context17.next = 44;
                  break;
                }

                _context17.next = 41;
                return _CommentUnlikes["default"].deleteOne({
                  userId: req.user.id
                });

              case 41:
                return _context17.abrupt("return", res.status(201).json({
                  msg: "Removed unlike"
                }));

              case 44:
                saveUnlike();

              case 45:
                _context17.next = 48;
                break;

              case 47:
                res.status(400).json({
                  error: "reaction can't be ".concat(_action)
                });

              case 48:
                _context17.next = 53;
                break;

              case 50:
                _context17.prev = 50;
                _context17.t0 = _context17["catch"](5);
                res.status(400).json({
                  error: "Failed to ".concat(action, " "),
                  err: _context17.t0
                });

              case 53:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, null, [[5, 50]]);
      }));

      function reactToThePostComment(_x29, _x30) {
        return _reactToThePostComment.apply(this, arguments);
      }

      return reactToThePostComment;
    }()
  }, {
    key: "reactToThePostCommentReply",
    value: function () {
      var _reactToThePostCommentReply = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20(req, res) {
        var commentReply, user, like, unlike, _action2, saveLike, saveUnlike, hasLiked, hasUnLiked;

        return _regenerator["default"].wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _context20.next = 2;
                return _CommentReplies["default"].findById(req.params.replyId);

              case 2:
                commentReply = _context20.sent;

                if (commentReply) {
                  _context20.next = 5;
                  break;
                }

                return _context20.abrupt("return", res.status(404).json({
                  error: "Reply not found"
                }));

              case 5:
                _context20.next = 7;
                return _User["default"].findById(req.user.id);

              case 7:
                user = _context20.sent;
                like = new _CommentReplyLikes["default"]({
                  user: user,
                  userId: req.user.id
                });
                unlike = new _CommentReplyUnlikes["default"]({
                  user: user,
                  userId: req.user.id
                });
                _context20.prev = 10;
                _action2 = req.params.action;

                saveLike = /*#__PURE__*/function () {
                  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18() {
                    var savedLike, id, savedComment;
                    return _regenerator["default"].wrap(function _callee18$(_context18) {
                      while (1) {
                        switch (_context18.prev = _context18.next) {
                          case 0:
                            _context18.next = 2;
                            return like.save();

                          case 2:
                            savedLike = _context18.sent;
                            id = savedLike._id;
                            _context18.next = 6;
                            return _CommentReplies["default"].findByIdAndUpdate(req.params.replyId, {
                              $push: {
                                likes: savedLike._id
                              }
                            }, {
                              "new": true,
                              useFindAndModify: false
                            });

                          case 6:
                            savedComment = _context18.sent;
                            res.status(201).json({
                              msg: "liked!",
                              like: savedLike
                            });

                          case 8:
                          case "end":
                            return _context18.stop();
                        }
                      }
                    }, _callee18);
                  }));

                  return function saveLike() {
                    return _ref3.apply(this, arguments);
                  };
                }();

                saveUnlike = /*#__PURE__*/function () {
                  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19() {
                    var savedUnLike, id;
                    return _regenerator["default"].wrap(function _callee19$(_context19) {
                      while (1) {
                        switch (_context19.prev = _context19.next) {
                          case 0:
                            _context19.next = 2;
                            return unlike.save();

                          case 2:
                            savedUnLike = _context19.sent;
                            id = savedUnLike._id;
                            _context19.next = 6;
                            return _CommentReplies["default"].findByIdAndUpdate(req.params.replyId, {
                              $push: {
                                unLikes: savedUnLike._id
                              }
                            }, {
                              "new": true,
                              useFindAndModify: false
                            });

                          case 6:
                            res.status(201).json({
                              msg: "unliked!",
                              unlike: savedUnLike
                            });

                          case 7:
                          case "end":
                            return _context19.stop();
                        }
                      }
                    }, _callee19);
                  }));

                  return function saveUnlike() {
                    return _ref4.apply(this, arguments);
                  };
                }();

                _context20.next = 16;
                return _CommentReplyLikes["default"].findOne({
                  userId: req.user.id
                });

              case 16:
                hasLiked = _context20.sent;
                _context20.next = 19;
                return _CommentReplyUnlikes["default"].findOne({
                  userId: req.user.id
                });

              case 19:
                hasUnLiked = _context20.sent;

                if (!(_action2 == "like")) {
                  _context20.next = 36;
                  break;
                }

                if (!hasLiked) {
                  _context20.next = 27;
                  break;
                }

                _context20.next = 24;
                return _CommentReplyLikes["default"].deleteOne({
                  userId: req.user.id
                });

              case 24:
                return _context20.abrupt("return", res.status(201).json({
                  msg: "Removed like"
                }));

              case 27:
                if (!hasUnLiked) {
                  _context20.next = 33;
                  break;
                }

                _context20.next = 30;
                return _CommentReplyUnlikes["default"].deleteOne({
                  userId: req.user.id
                });

              case 30:
                saveLike();
                _context20.next = 34;
                break;

              case 33:
                saveLike();

              case 34:
                _context20.next = 53;
                break;

              case 36:
                if (!(_action2 == "unlike")) {
                  _context20.next = 52;
                  break;
                }

                if (!hasLiked) {
                  _context20.next = 43;
                  break;
                }

                _context20.next = 40;
                return _CommentReplyUnlikes["default"].deleteOne({
                  userId: req.user.id
                });

              case 40:
                saveUnlike();
                _context20.next = 50;
                break;

              case 43:
                if (!hasUnLiked) {
                  _context20.next = 49;
                  break;
                }

                _context20.next = 46;
                return _CommentReplyUnlikes["default"].deleteOne({
                  userId: req.user.id
                });

              case 46:
                return _context20.abrupt("return", res.status(201).json({
                  msg: "Removed unlike"
                }));

              case 49:
                saveUnlike();

              case 50:
                _context20.next = 53;
                break;

              case 52:
                res.status(400).json({
                  error: "reaction can't be ".concat(_action2)
                });

              case 53:
                _context20.next = 58;
                break;

              case 55:
                _context20.prev = 55;
                _context20.t0 = _context20["catch"](10);
                res.status(400).json({
                  error: "Failed to ".concat(action, " "),
                  err: _context20.t0
                });

              case 58:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, null, [[10, 55]]);
      }));

      function reactToThePostCommentReply(_x31, _x32) {
        return _reactToThePostCommentReply.apply(this, arguments);
      }

      return reactToThePostCommentReply;
    }()
  }, {
    key: "reactToThePost",
    value: function () {
      var _reactToThePost = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23(req, res) {
        var user, like, unlike, _action3, saveLike, saveUnlike, hasLiked, hasUnLiked;

        return _regenerator["default"].wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                _context23.next = 2;
                return _User["default"].findById(req.user.id);

              case 2:
                user = _context23.sent;
                like = new _PostLikes["default"]({
                  user: user,
                  userId: req.user.id
                });
                unlike = new _PostUnLikes["default"]({
                  user: user,
                  userId: req.user.id
                });
                _context23.prev = 5;
                _action3 = req.params.action;

                saveLike = /*#__PURE__*/function () {
                  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21() {
                    var savedLike, id, savedPost;
                    return _regenerator["default"].wrap(function _callee21$(_context21) {
                      while (1) {
                        switch (_context21.prev = _context21.next) {
                          case 0:
                            _context21.next = 2;
                            return like.save();

                          case 2:
                            savedLike = _context21.sent;
                            id = savedLike._id;
                            _context21.next = 6;
                            return _Post["default"].findByIdAndUpdate(req.params.postId, {
                              $push: {
                                likes: savedLike._id
                              }
                            }, {
                              "new": true,
                              useFindAndModify: false
                            });

                          case 6:
                            savedPost = _context21.sent;
                            res.status(201).json({
                              msg: "liked!",
                              like: savedLike
                            });

                          case 8:
                          case "end":
                            return _context21.stop();
                        }
                      }
                    }, _callee21);
                  }));

                  return function saveLike() {
                    return _ref5.apply(this, arguments);
                  };
                }();

                saveUnlike = /*#__PURE__*/function () {
                  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22() {
                    var savedUnLike, id;
                    return _regenerator["default"].wrap(function _callee22$(_context22) {
                      while (1) {
                        switch (_context22.prev = _context22.next) {
                          case 0:
                            _context22.next = 2;
                            return unlike.save();

                          case 2:
                            savedUnLike = _context22.sent;
                            id = savedUnLike._id;
                            _context22.next = 6;
                            return _Post["default"].findByIdAndUpdate(req.params.postId, {
                              $push: {
                                unLikes: savedUnLike._id
                              }
                            }, {
                              "new": true,
                              useFindAndModify: false
                            });

                          case 6:
                            res.status(201).json({
                              msg: "unliked!",
                              unlike: savedUnLike
                            });

                          case 7:
                          case "end":
                            return _context22.stop();
                        }
                      }
                    }, _callee22);
                  }));

                  return function saveUnlike() {
                    return _ref6.apply(this, arguments);
                  };
                }();

                _context23.next = 11;
                return _PostLikes["default"].findOne({
                  userId: req.user.id
                });

              case 11:
                hasLiked = _context23.sent;
                _context23.next = 14;
                return _PostUnLikes["default"].findOne({
                  userId: req.user.id
                });

              case 14:
                hasUnLiked = _context23.sent;

                if (!(_action3 == "like")) {
                  _context23.next = 31;
                  break;
                }

                if (!hasLiked) {
                  _context23.next = 22;
                  break;
                }

                _context23.next = 19;
                return _PostLikes["default"].deleteOne({
                  userId: req.user.id
                });

              case 19:
                return _context23.abrupt("return", res.status(201).json({
                  msg: "Removed like"
                }));

              case 22:
                if (!hasUnLiked) {
                  _context23.next = 28;
                  break;
                }

                _context23.next = 25;
                return _PostUnLikes["default"].deleteOne({
                  userId: req.user.id
                });

              case 25:
                saveLike();
                _context23.next = 29;
                break;

              case 28:
                saveLike();

              case 29:
                _context23.next = 48;
                break;

              case 31:
                if (!(_action3 == "unlike")) {
                  _context23.next = 47;
                  break;
                }

                if (!hasLiked) {
                  _context23.next = 38;
                  break;
                }

                _context23.next = 35;
                return _PostLikes["default"].deleteOne({
                  userId: req.user.id
                });

              case 35:
                saveUnlike();
                _context23.next = 45;
                break;

              case 38:
                if (!hasUnLiked) {
                  _context23.next = 44;
                  break;
                }

                _context23.next = 41;
                return _PostUnLikes["default"].deleteOne({
                  userId: req.user.id
                });

              case 41:
                return _context23.abrupt("return", res.status(201).json({
                  msg: "Removed unlike"
                }));

              case 44:
                saveUnlike();

              case 45:
                _context23.next = 48;
                break;

              case 47:
                res.status(400).json({
                  error: "reaction can't be ".concat(_action3)
                });

              case 48:
                _context23.next = 53;
                break;

              case 50:
                _context23.prev = 50;
                _context23.t0 = _context23["catch"](5);
                res.status(400).json({
                  error: "Failed to ".concat(req.params.action, " "),
                  err: _context23.t0
                });

              case 53:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, null, [[5, 50]]);
      }));

      function reactToThePost(_x33, _x34) {
        return _reactToThePost.apply(this, arguments);
      }

      return reactToThePost;
    }()
  }, {
    key: "searchPosts",
    value: function () {
      var _searchPosts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24(req, res) {
        var posts;
        return _regenerator["default"].wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                _context24.prev = 0;
                _context24.next = 3;
                return _Post["default"].aggregate([{
                  $search: {
                    text: {
                      query: req.query.term,
                      path: ["description", "title"]
                    }
                  }
                }]);

              case 3:
                posts = _context24.sent;
                res.status(200).json({
                  msg: "Search results retrieved successfuly",
                  posts: posts
                });
                _context24.next = 10;
                break;

              case 7:
                _context24.prev = 7;
                _context24.t0 = _context24["catch"](0);
                res.status(400).json({
                  error: "Error occurred",
                  err: _context24.t0
                });

              case 10:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, null, [[0, 7]]);
      }));

      function searchPosts(_x35, _x36) {
        return _searchPosts.apply(this, arguments);
      }

      return searchPosts;
    }()
  }, {
    key: "createBlogVideo",
    value: function () {
      var _createBlogVideo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25(req, res) {
        var video, saveVideo;
        return _regenerator["default"].wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                _context25.prev = 0;
                video = new _BlogVideos["default"]({
                  author: req.user.id,
                  link: req.body.link,
                  description: req.body.description
                });
                _context25.next = 4;
                return video.save();

              case 4:
                saveVideo = _context25.sent;
                res.status(201).json({
                  msg: "Video added succesfuly",
                  video: saveVideo
                });
                _context25.next = 11;
                break;

              case 8:
                _context25.prev = 8;
                _context25.t0 = _context25["catch"](0);
                res.status(400).json({
                  error: "Something went wrong",
                  err: _context25.t0
                });

              case 11:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, null, [[0, 8]]);
      }));

      function createBlogVideo(_x37, _x38) {
        return _createBlogVideo.apply(this, arguments);
      }

      return createBlogVideo;
    }()
  }, {
    key: "getBlogVideos",
    value: function () {
      var _getBlogVideos = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee26(req, res) {
        var videos;
        return _regenerator["default"].wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                _context26.prev = 0;
                _context26.next = 3;
                return _BlogVideos["default"].find({}).populate("author");

              case 3:
                videos = _context26.sent;
                res.status(200).json({
                  msg: "Videos fetched successfuly",
                  videos: videos
                });
                _context26.next = 10;
                break;

              case 7:
                _context26.prev = 7;
                _context26.t0 = _context26["catch"](0);
                res.status(400).json({
                  error: "Something went wrong",
                  err: _context26.t0
                });

              case 10:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26, null, [[0, 7]]);
      }));

      function getBlogVideos(_x39, _x40) {
        return _getBlogVideos.apply(this, arguments);
      }

      return getBlogVideos;
    }()
  }, {
    key: "updateBlogVideo",
    value: function () {
      var _updateBlogVideo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee27(req, res) {
        var video;
        return _regenerator["default"].wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                _context27.prev = 0;
                _context27.next = 3;
                return _BlogVideos["default"].findById(req.params.id);

              case 3:
                video = _context27.sent;
                console.log(video);

                if (!video) {
                  res.status(404).json({
                    error: "Video not found"
                  });
                }

                _context27.next = 8;
                return video.updateOne({
                  $set: {
                    author: req.user.id,
                    link: req.body.link,
                    description: req.body.description
                  }
                });

              case 8:
                res.status(201).json({
                  msg: "Video updated successfuly",
                  video: video
                });
                _context27.next = 14;
                break;

              case 11:
                _context27.prev = 11;
                _context27.t0 = _context27["catch"](0);
                res.status(400).json({
                  error: "Something went wrong",
                  err: _context27.t0
                });

              case 14:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27, null, [[0, 11]]);
      }));

      function updateBlogVideo(_x41, _x42) {
        return _updateBlogVideo.apply(this, arguments);
      }

      return updateBlogVideo;
    }()
  }]);
  return PostController;
}();

var _default = PostController;
exports["default"] = _default;