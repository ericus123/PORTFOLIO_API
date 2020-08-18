const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../model/User");
router.get("/", verify, (req, res) => {
  res.json({
    posts: {
      title: "My first post",
      description:
        "random data you should access only if logged in and verified",
    },
  });
});

module.exports = router;
