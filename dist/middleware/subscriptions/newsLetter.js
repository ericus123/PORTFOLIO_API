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

var _emailCheck = _interopRequireDefault(require("email-check"));

var NewsLetterMiddleware = /*#__PURE__*/function () {
  function NewsLetterMiddleware() {
    (0, _classCallCheck2["default"])(this, NewsLetterMiddleware);
  }

  (0, _createClass2["default"])(NewsLetterMiddleware, null, [{
    key: "checkEmail",
    value: function () {
      var _checkEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        var email;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                email = req.body.email;

                if (!email) {
                  res.status(400).json({
                    error: "Please fill in your email"
                  });
                } // Quick version


                _context.next = 4;
                return (0, _emailCheck["default"])(email).then(function (res) {
                  if (true) {
                    next();
                  }

                  res.status(400).json({
                    error: "Email doesn't exist"
                  });
                })["catch"](function (err) {
                  if (err.message === "refuse") {
                    // The MX server is refusing requests from your IP address.
                    res.status(500).json({
                      error: "Server error, try again!"
                    });
                  } else {
                    // Decide what to do with other errors.
                    res.status(400).json({
                      error: "Something went wrong",
                      err: error
                    });
                  }
                });

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function checkEmail(_x, _x2, _x3) {
        return _checkEmail.apply(this, arguments);
      }

      return checkEmail;
    }()
  }]);
  return NewsLetterMiddleware;
}();

var _default = NewsLetterMiddleware;
exports["default"] = _default;