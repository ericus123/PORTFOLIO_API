const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../model/User");
router.post("/", verify, (req, res) => {
  res.json({
    posts: {
      title: "My first created post",
      description:
        "random data you should create only if logged in and verified",
    },
  });
});

module.exports = router;
