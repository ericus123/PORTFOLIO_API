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

var _CommentReactions = _interopRequireDefault(require("../../model/CommentReactions"));

var _User = _interopRequireDefault(require("../../model/User"));

var _PostReactions = _interopRequireDefault(require("../../model/PostReactions"));

var _Category = _interopRequireDefault(require("../../model/Category"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _CommentReplyReactions = _interopRequireDefault(require("../../model/CommentReplyReactions"));

var _BlogVideos = _interopRequireDefault(require("../../model/BlogVideos"));

var _index = require("../../helpers/images/index");

_dotenv["default"].config();

var PostController = /*#__PURE__*/function () {
  function PostController() {
    (0, _classCallCheck2["default"])(this, PostController);
  }

  (0, _createClass2["default"])(PostController, null, [{
    key: "createPost",
    value: function () {
      var _createPost = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _req$body, title, description, category, img, _category, uploaded_image, _post, savedPost;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, title = _req$body.title, description = _req$body.description, category = _req$body.category, img = _req$body.img;
                _context.next = 4;
                return _Category["default"].findOne({
                  _id: category
                });

              case 4:
                _category = _context.sent;

                if (_category) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", res.status(404).json({
                  error: "Category not found"
                }));

              case 7:
                _context.next = 9;
                return (0, _index.uploadImage)(img, "/Blog/Posts");

              case 9:
                uploaded_image = _context.sent;
                _post = new _Post["default"]({
                  title: req.title,
                  description: description,
                  author: req.user.id,
                  category: _category,
                  imageUrl: uploaded_image.secure_url,
                  image_public_id: uploaded_image.public_id
                });
                _context.next = 13;
                return _post.save();

              case 13:
                savedPost = _context.sent;
                _context.next = 16;
                return _User["default"].findByIdAndUpdate(req.user.id, {
                  $push: {
                    posts: savedPost._id
                  }
                }, {
                  "new": true,
                  useFindAndModify: false
                });

              case 16:
                return _context.abrupt("return", res.status(201).json({
                  message: "Post created succesfully",
                  article: savedPost
                }));

              case 19:
                _context.prev = 19;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(500).json({
                  err: "Something went wrong",
                  error: _context.t0
                }));

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 19]]);
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
                  } else {
                    results.previous = {
                      page: null,
                      limit: limit
                    };
                  }
                }

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
                return _context2.abrupt("return", res.status(200).json({
                  msg: "Posts fetched successfuly",
                  postsPerPage: results,
                  posts: all
                }));

              case 27:
                _context2.prev = 27;
                _context2.t2 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(500).json({
                  error: "Something went wrong",
                  err: _context2.t2
                }));

              case 30:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 27]]);
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
                return _Post["default"].findById(id).populate(["category", {
                  path: "comments",
                  populate: {
                    path: "replies"
                  }
                }, "likes", "unLikes", "category"]);

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
        var id, _post2, _req$body2, description, category, img, _category, uploaded_image, updatedPost;

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
                _req$body2 = req.body, description = _req$body2.description, category = _req$body2.category, img = _req$body2.img;
                _context4.next = 10;
                return _Category["default"].findOne({
                  _id: category
                });

              case 10:
                _category = _context4.sent;

                if (_category) {
                  _context4.next = 13;
                  break;
                }

                return _context4.abrupt("return", res.status(404).json({
                  error: "Category not found"
                }));

              case 13:
                _context4.next = 15;
                return (0, _index.uploadImage)(img, "/Blog/Posts");

              case 15:
                uploaded_image = _context4.sent;
                _context4.next = 18;
                return (0, _index.deleteImage)(_post2.image_public_id);

              case 18:
                _context4.next = 20;
                return _post2.updateOne({
                  $set: {
                    title: req.title,
                    description: description,
                    category: category,
                    imageUrl: uploaded_image.secure_url,
                    updatedBy: req.user.id,
                    image_public_id: uploaded_image.public_id,
                    updatedAt: Date.now()
                  }
                });

              case 20:
                _context4.next = 22;
                return _Post["default"].findOne({
                  _id: id
                });

              case 22:
                updatedPost = _context4.sent;
                return _context4.abrupt("return", res.status(201).json({
                  message: "Post updated successfully",
                  post: updatedPost
                }));

              case 26:
                _context4.prev = 26;
                _context4.t0 = _context4["catch"](1);
                return _context4.abrupt("return", res.status(400).json({
                  error: "Something went wrong",
                  err: _context4.t0
                }));

              case 29:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 26]]);
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
                _context5.next = 10;
                return (0, _index.deleteImage)(_post3.image_public_id);

              case 10:
                return _context5.abrupt("return", res.status(201).json({
                  message: "Post deleted successfully !"
                }));

              case 13:
                _context5.prev = 13;
                _context5.t0 = _context5["catch"](0);
                return _context5.abrupt("return", res.status(400).json({
                  error: "Can't delete post",
                  post: post
                }));

              case 16:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 13]]);
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
                  description: req.body.description,
                  createdBy: req.user.id
                });
                _context7.prev = 1;
                _context7.next = 4;
                return cat.save();

              case 4:
                return _context7.abrupt("return", res.status(201).json({
                  msg: "Category is created successfuly",
                  category: cat
                }));

              case 7:
                _context7.prev = 7;
                _context7.t0 = _context7["catch"](1);
                return _context7.abrupt("return", res.status(400).json({
                  error: "Failed to create category"
                }));

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
    key: "updatePostCat",
    value: function () {
      var _updatePostCat = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
        var category;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _context8.next = 3;
                return _Category["default"].findByIdAndUpdate(req.params.category, {
                  $set: {
                    name: req.body.name,
                    description: req.body.description,
                    updatedBy: req.user.id,
                    updatedAt: Date.now()
                  }
                }, {
                  useFindAndModify: false
                });

              case 3:
                category = _context8.sent;
                return _context8.abrupt("return", res.status(201).json({
                  msg: "Category is updated successfuly"
                }));

              case 7:
                _context8.prev = 7;
                _context8.t0 = _context8["catch"](0);
                return _context8.abrupt("return", res.status(400).json({
                  error: "Failed to update category"
                }));

              case 10:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[0, 7]]);
      }));

      function updatePostCat(_x15, _x16) {
        return _updatePostCat.apply(this, arguments);
      }

      return updatePostCat;
    }()
  }, {
    key: "deleteCategory",
    value: function () {
      var _deleteCategory = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return _Category["default"].findOneAndDelete({
                  _id: req.params.category
                }, {
                  useFindAndModify: false
                });

              case 3:
                return _context9.abrupt("return", res.status(201).json({
                  msg: "Category deleted successfuly"
                }));

              case 6:
                _context9.prev = 6;
                _context9.t0 = _context9["catch"](0);
                return _context9.abrupt("return", res.status(400).json({
                  error: "Something went wrong"
                }));

              case 9:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[0, 6]]);
      }));

      function deleteCategory(_x17, _x18) {
        return _deleteCategory.apply(this, arguments);
      }

      return deleteCategory;
    }()
  }, {
    key: "getPostCats",
    value: function () {
      var _getPostCats = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
        var categories;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                _context10.next = 3;
                return _Category["default"].find({});

              case 3:
                categories = _context10.sent;
                return _context10.abrupt("return", res.status(200).json({
                  msg: "Post categories fetched successfuly",
                  categories: categories
                }));

              case 7:
                _context10.prev = 7;
                _context10.t0 = _context10["catch"](0);
                return _context10.abrupt("return", res.status(400).json({
                  error: "Failed to get post category"
                }));

              case 10:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[0, 7]]);
      }));

      function getPostCats(_x19, _x20) {
        return _getPostCats.apply(this, arguments);
      }

      return getPostCats;
    }()
  }, {
    key: "getPostCat",
    value: function () {
      var _getPostCat = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
        var category;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                _context11.next = 3;
                return _Category["default"].findOne({
                  _id: req.params.category
                });

              case 3:
                category = _context11.sent;

                if (category) {
                  _context11.next = 6;
                  break;
                }

                return _context11.abrupt("return", res.status(404).json({
                  error: "Category not found"
                }));

              case 6:
                return _context11.abrupt("return", res.status(200).json({
                  msg: "Post category fetched successfuly",
                  category: category
                }));

              case 9:
                _context11.prev = 9;
                _context11.t0 = _context11["catch"](0);
                return _context11.abrupt("return", res.status(400).json({
                  error: "Failed to get post category"
                }));

              case 12:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, null, [[0, 9]]);
      }));

      function getPostCat(_x21, _x22) {
        return _getPostCat.apply(this, arguments);
      }

      return getPostCat;
    }()
  }, {
    key: "postComment",
    value: function () {
      var _postComment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
        var description, comment, savedComment, id, _post4;

        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                description = req.body.description;
                comment = new _Comments["default"]({
                  description: description,
                  user: req.user.id
                });
                _context12.prev = 2;
                _context12.next = 5;
                return comment.save();

              case 5:
                savedComment = _context12.sent;
                id = savedComment._id;
                _context12.next = 9;
                return _Post["default"].findByIdAndUpdate(req.params.postId, {
                  $push: {
                    comments: savedComment._id
                  }
                }, {
                  "new": true,
                  useFindAndModify: false
                });

              case 9:
                _context12.next = 11;
                return _Post["default"].findById(req.params.postId).populate("comments");

              case 11:
                _post4 = _context12.sent;
                return _context12.abrupt("return", res.status(201).json({
                  msg: "Comment saved!",
                  comment: savedComment
                }));

              case 15:
                _context12.prev = 15;
                _context12.t0 = _context12["catch"](2);
                return _context12.abrupt("return", res.status(400).json({
                  error: "Failed to create comment",
                  err: _context12.t0
                }));

              case 18:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, null, [[2, 15]]);
      }));

      function postComment(_x23, _x24) {
        return _postComment.apply(this, arguments);
      }

      return postComment;
    }()
  }, {
    key: "deleteComment",
    value: function () {
      var _deleteComment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
        return _regenerator["default"].wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.prev = 0;
                _context13.next = 3;
                return _Comments["default"].findOneAndDelete({
                  _id: req.params.commentId
                }, {
                  useFindAndModify: false
                });

              case 3:
                return _context13.abrupt("return", res.status(201).json({
                  msg: "Deleted comment"
                }));

              case 6:
                _context13.prev = 6;
                _context13.t0 = _context13["catch"](0);
                return _context13.abrupt("return", res.status(400).json({
                  error: "Error occured"
                }));

              case 9:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, null, [[0, 6]]);
      }));

      function deleteComment(_x25, _x26) {
        return _deleteComment.apply(this, arguments);
      }

      return deleteComment;
    }()
  }, {
    key: "editComment",
    value: function () {
      var _editComment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res) {
        return _regenerator["default"].wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.prev = 0;
                _context14.next = 3;
                return _Comments["default"].findByIdAndUpdate(req.params.commentId, {
                  $set: {
                    description: req.body.description
                  }
                }, {
                  useFindAndModify: false
                });

              case 3:
                return _context14.abrupt("return", res.status(201).json({
                  msg: "Edited comment "
                }));

              case 6:
                _context14.prev = 6;
                _context14.t0 = _context14["catch"](0);
                return _context14.abrupt("return", res.status(400).json({
                  error: "Error occured"
                }));

              case 9:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, null, [[0, 6]]);
      }));

      function editComment(_x27, _x28) {
        return _editComment.apply(this, arguments);
      }

      return editComment;
    }()
  }, {
    key: "editCommentReply",
    value: function () {
      var _editCommentReply = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(req, res) {
        return _regenerator["default"].wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.prev = 0;
                _context15.next = 3;
                return _CommentReplies["default"].findByIdAndUpdate(req.params.commentReplyId, {
                  $set: {
                    description: req.body.description
                  }
                }, {
                  useFindAndModify: false
                });

              case 3:
                return _context15.abrupt("return", res.status(201).json({
                  msg: "Edited reply"
                }));

              case 6:
                _context15.prev = 6;
                _context15.t0 = _context15["catch"](0);
                return _context15.abrupt("return", res.status(400).json({
                  error: "Error occured"
                }));

              case 9:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, null, [[0, 6]]);
      }));

      function editCommentReply(_x29, _x30) {
        return _editCommentReply.apply(this, arguments);
      }

      return editCommentReply;
    }()
  }, {
    key: "postCommentReply",
    value: function () {
      var _postCommentReply = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(req, res) {
        var user, commentReply, savedReply, id;
        return _regenerator["default"].wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.prev = 0;
                _context16.next = 3;
                return _User["default"].findById(req.user.id);

              case 3:
                user = _context16.sent;
                commentReply = new _CommentReplies["default"]({
                  description: req.body.description,
                  user: user
                });
                _context16.next = 7;
                return commentReply.save();

              case 7:
                savedReply = _context16.sent;
                id = savedReply._id;
                _context16.next = 11;
                return _Comments["default"].findByIdAndUpdate(req.params.commentId, {
                  $push: {
                    replies: savedReply._id
                  }
                }, {
                  "new": true,
                  useFindAndModify: false
                });

              case 11:
                return _context16.abrupt("return", res.status(201).json({
                  msg: "Reply saved!",
                  reply: savedReply,
                  commentId: req.params.commentId
                }));

              case 14:
                _context16.prev = 14;
                _context16.t0 = _context16["catch"](0);
                return _context16.abrupt("return", res.status(400).json({
                  error: "Failed to reply",
                  err: _context16.t0,
                  commentId: req.params.commentId
                }));

              case 17:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, null, [[0, 14]]);
      }));

      function postCommentReply(_x31, _x32) {
        return _postCommentReply.apply(this, arguments);
      }

      return postCommentReply;
    }()
  }, {
    key: "deleteCommentReply",
    value: function () {
      var _deleteCommentReply = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(req, res) {
        return _regenerator["default"].wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.prev = 0;
                _context17.next = 3;
                return _CommentReplies["default"].findOneAndDelete({
                  _id: req.params.commentReplyId
                }, {
                  useFindAndModify: false
                });

              case 3:
                return _context17.abrupt("return", res.status(201).json({
                  msg: "Deleted reply"
                }));

              case 6:
                _context17.prev = 6;
                _context17.t0 = _context17["catch"](0);
                return _context17.abrupt("return", res.status(400).json({
                  error: "Error occured"
                }));

              case 9:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, null, [[0, 6]]);
      }));

      function deleteCommentReply(_x33, _x34) {
        return _deleteCommentReply.apply(this, arguments);
      }

      return deleteCommentReply;
    }()
  }, {
    key: "reactToThePostComment",
    value: function () {
      var _reactToThePostComment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(req, res) {
        var commentId, hasLiked, like, savedLike;
        return _regenerator["default"].wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.prev = 0;
                commentId = req.params.commentId;
                _context18.next = 4;
                return _CommentReactions["default"].findOne({
                  commentId: commentId,
                  user: req.user.id
                });

              case 4:
                hasLiked = _context18.sent;

                if (!hasLiked) {
                  _context18.next = 9;
                  break;
                }

                _context18.next = 8;
                return hasLiked["delete"]();

              case 8:
                return _context18.abrupt("return", res.status(201).json({
                  msg: "Unliked"
                }));

              case 9:
                like = new _CommentReactions["default"]({
                  user: req.user.id,
                  commentId: commentId
                });
                _context18.next = 12;
                return like.save();

              case 12:
                savedLike = _context18.sent;
                _context18.next = 15;
                return _Comments["default"].findByIdAndUpdate(req.params.commentId, {
                  $push: {
                    likes: savedLike._id
                  }
                }, {
                  "new": true,
                  useFindAndModify: false
                });

              case 15:
                return _context18.abrupt("return", res.status(201).json({
                  msg: "Liked",
                  like: savedLike
                }));

              case 18:
                _context18.prev = 18;
                _context18.t0 = _context18["catch"](0);
                return _context18.abrupt("return", res.status(400).json({
                  error: "Something went wrong",
                  err: _context18.t0
                }));

              case 21:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, null, [[0, 18]]);
      }));

      function reactToThePostComment(_x35, _x36) {
        return _reactToThePostComment.apply(this, arguments);
      }

      return reactToThePostComment;
    }()
  }, {
    key: "reactToThePostCommentReply",
    value: function () {
      var _reactToThePostCommentReply = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19(req, res) {
        var replyId, hasLiked, like, savedLike;
        return _regenerator["default"].wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.prev = 0;
                replyId = req.params.replyId;
                _context19.next = 4;
                return _CommentReplyReactions["default"].findOne({
                  replyId: replyId,
                  user: req.user.id
                });

              case 4:
                hasLiked = _context19.sent;

                if (!hasLiked) {
                  _context19.next = 9;
                  break;
                }

                _context19.next = 8;
                return hasLiked["delete"]();

              case 8:
                return _context19.abrupt("return", res.status(201).json({
                  msg: "Unliked"
                }));

              case 9:
                like = new _CommentReplyReactions["default"]({
                  user: req.user.id,
                  replyId: replyId
                });
                _context19.next = 12;
                return like.save();

              case 12:
                savedLike = _context19.sent;
                _context19.next = 15;
                return _CommentReplies["default"].findByIdAndUpdate(req.params.replyId, {
                  $push: {
                    likes: savedLike._id
                  }
                }, {
                  "new": true,
                  useFindAndModify: false
                });

              case 15:
                return _context19.abrupt("return", res.status(201).json({
                  msg: "Liked",
                  like: savedLike
                }));

              case 18:
                _context19.prev = 18;
                _context19.t0 = _context19["catch"](0);
                return _context19.abrupt("return", res.status(400).json({
                  error: "Something went wrong",
                  err: _context19.t0
                }));

              case 21:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, null, [[0, 18]]);
      }));

      function reactToThePostCommentReply(_x37, _x38) {
        return _reactToThePostCommentReply.apply(this, arguments);
      }

      return reactToThePostCommentReply;
    }()
  }, {
    key: "reactToThePost",
    value: function () {
      var _reactToThePost = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20(req, res) {
        var hasLiked, like, savedLike;
        return _regenerator["default"].wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _context20.prev = 0;
                _context20.next = 3;
                return _PostReactions["default"].findOne({
                  user: req.user.id
                });

              case 3:
                hasLiked = _context20.sent;

                if (!hasLiked) {
                  _context20.next = 8;
                  break;
                }

                _context20.next = 7;
                return hasLiked["delete"]();

              case 7:
                return _context20.abrupt("return", res.status(201).json({
                  msg: "Unliked"
                }));

              case 8:
                like = new _PostReactions["default"]({
                  user: req.user.id,
                  postId: req.params.postId
                });
                _context20.next = 11;
                return like.save();

              case 11:
                savedLike = _context20.sent;
                _context20.next = 14;
                return _Post["default"].findByIdAndUpdate(req.params.postId, {
                  $push: {
                    likes: savedLike._id
                  }
                }, {
                  "new": true,
                  useFindAndModify: false
                });

              case 14:
                return _context20.abrupt("return", res.status(201).json({
                  msg: "Liked",
                  like: savedLike
                }));

              case 17:
                _context20.prev = 17;
                _context20.t0 = _context20["catch"](0);
                return _context20.abrupt("return", res.status(400).json({
                  error: "Something went wrong",
                  err: _context20.t0
                }));

              case 20:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, null, [[0, 17]]);
      }));

      function reactToThePost(_x39, _x40) {
        return _reactToThePost.apply(this, arguments);
      }

      return reactToThePost;
    }()
  }, {
    key: "getPostReactions",
    value: function () {
      var _getPostReactions = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21(req, res) {
        var postId, likes;
        return _regenerator["default"].wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _context21.prev = 0;
                postId = req.params.postId;
                _context21.next = 4;
                return _PostReactions["default"].find({
                  postId: postId
                });

              case 4:
                likes = _context21.sent;
                return _context21.abrupt("return", res.status(200).json({
                  msg: "Likes fetched successfully",
                  likes: likes
                }));

              case 8:
                _context21.prev = 8;
                _context21.t0 = _context21["catch"](0);
                return _context21.abrupt("return", res.status(500).json({
                  error: "Something went wrong",
                  err: _context21.t0
                }));

              case 11:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, null, [[0, 8]]);
      }));

      function getPostReactions(_x41, _x42) {
        return _getPostReactions.apply(this, arguments);
      }

      return getPostReactions;
    }()
  }, {
    key: "searchPosts",
    value: function () {
      var _searchPosts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22(req, res) {
        var query, posts;
        return _regenerator["default"].wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                _context22.prev = 0;
                query = req.query.term;

                if (query) {
                  _context22.next = 4;
                  break;
                }

                return _context22.abrupt("return", res.status(400).json({
                  error: "Search term is required"
                }));

              case 4:
                _context22.next = 6;
                return _Post["default"].aggregate([{
                  $search: {
                    text: {
                      query: req.query.term,
                      path: ["description", "title"]
                    }
                  }
                }]);

              case 6:
                posts = _context22.sent;
                return _context22.abrupt("return", res.status(200).json({
                  msg: "Search results retrieved successfuly",
                  posts: posts
                }));

              case 10:
                _context22.prev = 10;
                _context22.t0 = _context22["catch"](0);
                return _context22.abrupt("return", res.status(400).json({
                  error: "Error occurred",
                  err: _context22.t0
                }));

              case 13:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, null, [[0, 10]]);
      }));

      function searchPosts(_x43, _x44) {
        return _searchPosts.apply(this, arguments);
      }

      return searchPosts;
    }()
  }, {
    key: "createBlogVideo",
    value: function () {
      var _createBlogVideo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23(req, res) {
        var video, saveVideo;
        return _regenerator["default"].wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                _context23.prev = 0;
                video = new _BlogVideos["default"]({
                  author: req.user.id,
                  link: req.body.link,
                  description: req.body.description
                });
                _context23.next = 4;
                return video.save();

              case 4:
                saveVideo = _context23.sent;
                return _context23.abrupt("return", res.status(201).json({
                  msg: "Video added succesfuly",
                  video: saveVideo
                }));

              case 8:
                _context23.prev = 8;
                _context23.t0 = _context23["catch"](0);
                return _context23.abrupt("return", res.status(400).json({
                  error: "Something went wrong",
                  err: _context23.t0
                }));

              case 11:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, null, [[0, 8]]);
      }));

      function createBlogVideo(_x45, _x46) {
        return _createBlogVideo.apply(this, arguments);
      }

      return createBlogVideo;
    }()
  }, {
    key: "getBlogVideos",
    value: function () {
      var _getBlogVideos = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24(req, res) {
        var videos;
        return _regenerator["default"].wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                _context24.prev = 0;
                _context24.next = 3;
                return _BlogVideos["default"].find({}).populate("author");

              case 3:
                videos = _context24.sent;
                return _context24.abrupt("return", res.status(200).json({
                  msg: "Videos fetched successfuly",
                  videos: videos
                }));

              case 7:
                _context24.prev = 7;
                _context24.t0 = _context24["catch"](0);
                return _context24.abrupt("return", res.status(400).json({
                  error: "Something went wrong",
                  err: _context24.t0
                }));

              case 10:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, null, [[0, 7]]);
      }));

      function getBlogVideos(_x47, _x48) {
        return _getBlogVideos.apply(this, arguments);
      }

      return getBlogVideos;
    }()
  }, {
    key: "updateBlogVideo",
    value: function () {
      var _updateBlogVideo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25(req, res) {
        var video;
        return _regenerator["default"].wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                _context25.prev = 0;
                _context25.next = 3;
                return _BlogVideos["default"].findById(req.params.id);

              case 3:
                video = _context25.sent;
                console.log(video);

                if (video) {
                  _context25.next = 7;
                  break;
                }

                return _context25.abrupt("return", res.status(404).json({
                  error: "Video not found"
                }));

              case 7:
                _context25.next = 9;
                return video.updateOne({
                  $set: {
                    author: req.user.id,
                    link: req.body.link,
                    description: req.body.description
                  }
                });

              case 9:
                return _context25.abrupt("return", res.status(201).json({
                  msg: "Video updated successfuly",
                  video: video
                }));

              case 12:
                _context25.prev = 12;
                _context25.t0 = _context25["catch"](0);
                return _context25.abrupt("return", res.status(400).json({
                  error: "Something went wrong",
                  err: _context25.t0
                }));

              case 15:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, null, [[0, 12]]);
      }));

      function updateBlogVideo(_x49, _x50) {
        return _updateBlogVideo.apply(this, arguments);
      }

      return updateBlogVideo;
    }()
  }]);
  return PostController;
}();

var _default = PostController;
exports["default"] = _default;