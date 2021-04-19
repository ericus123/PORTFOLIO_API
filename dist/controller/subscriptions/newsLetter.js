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

var _NewsLetter = _interopRequireDefault(require("../../model/NewsLetter"));

var NewsLetterController = /*#__PURE__*/function () {
  function NewsLetterController() {
    (0, _classCallCheck2["default"])(this, NewsLetterController);
  }

  (0, _createClass2["default"])(NewsLetterController, null, [{
    key: "subscribe",
    value: function () {
      var _subscribe = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var email, subscribed, subscriber;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                email = req.params.email;
                _context.next = 4;
                return _NewsLetter["default"].findOne({
                  email: email
                });

              case 4:
                subscribed = _context.sent;

                if (!subscribed) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  error: "You've already subscribed"
                }));

              case 7:
                subscriber = new _NewsLetter["default"]({
                  email: email
                });
                _context.next = 10;
                return subscriber.save();

              case 10:
                return _context.abrupt("return", res.status(201).json({
                  msg: "Subscribed successfuly",
                  subscriber: {
                    email: email,
                    createdAt: Date.now
                  }
                }));

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(400).json({
                  error: "Something went wrong"
                }));

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 13]]);
      }));

      function subscribe(_x, _x2) {
        return _subscribe.apply(this, arguments);
      }

      return subscribe;
    }()
  }, {
    key: "unsubscribe",
    value: function () {
      var _unsubscribe = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var email, subscribed;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                email = req.params.email;
                _context2.next = 4;
                return _NewsLetter["default"].findOne({
                  email: email
                });

              case 4:
                subscribed = _context2.sent;

                if (subscribed) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", res.status(400).json({
                  error: "You've not subscribed"
                }));

              case 7:
                _context2.next = 9;
                return _NewsLetter["default"].deleteOne(subscribed);

              case 9:
                return _context2.abrupt("return", res.status(201).json({
                  msg: "Unsubscribed successfuly",
                  unsubscriber: subscribed
                }));

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(400).json({
                  error: "Something went wrong, try again"
                }));

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 12]]);
      }));

      function unsubscribe(_x3, _x4) {
        return _unsubscribe.apply(this, arguments);
      }

      return unsubscribe;
    }()
  }, {
    key: "getSubscribers",
    value: function () {
      var _getSubscribers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var subscribers;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _NewsLetter["default"].find({});

              case 3:
                subscribers = _context3.sent;
                return _context3.abrupt("return", res.status(200).json({
                  msg: "Subscribers fetched succcsfuly",
                  subscribers: subscribers
                }));

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", res.status(400).json({
                  error: "Something went wrong",
                  err: _context3.t0
                }));

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 7]]);
      }));

      function getSubscribers(_x5, _x6) {
        return _getSubscribers.apply(this, arguments);
      }

      return getSubscribers;
    }()
  }, {
    key: "getSubscriber",
    value: function () {
      var _getSubscriber = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var email, subscriber;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                email = req.params.email;
                _context4.next = 4;
                return _NewsLetter["default"].findOne({
                  email: email
                });

              case 4:
                subscriber = _context4.sent;

                if (subscriber) {
                  _context4.next = 7;
                  break;
                }

                return _context4.abrupt("return", res.status(404).json({
                  error: "Subscriber not found"
                }));

              case 7:
                return _context4.abrupt("return", res.status(200).json({
                  msg: "Subscriber fetched succcsfuly",
                  subscriber: subscriber
                }));

              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", res.status(400).json({
                  error: "Something went wrong",
                  err: _context4.t0
                }));

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 10]]);
      }));

      function getSubscriber(_x7, _x8) {
        return _getSubscriber.apply(this, arguments);
      }

      return getSubscriber;
    }()
  }]);
  return NewsLetterController;
}();

var _default = NewsLetterController;
exports["default"] = _default;