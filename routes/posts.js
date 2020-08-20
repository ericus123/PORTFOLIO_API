const router = require("express").Router();
const mongoose = require("mongoose");
const Post = require("../model/Post");
const verify = require("./verifyToken");

const { postValidation } = require("../validation");
router.post("/create", verify, async (req, res) => {
  //VALIDATE THE DATA BEFORE CREATING  A POST
  const { error } = postValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Create a new Post
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
  });
  try {
    const savedPost = await post.save();
    res.send(savedPost);
  } catch (err) {
    res.status(400).send(err);
  }
});

//Get posts form db

router.get("/", function (req, res) {
  Post.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

//Edit post

router.put("/:id", verify, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    if (req.body.title) {
      post.title = req.body.title;
    }
    if (req.body.description) {
      post.content = req.body.content;
    }
    await post.save();
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Ooops!!!! Post doesn't exist!" });
  }
});

//Delete  post

router.delete("/:id", verify, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    await post.deleteOne();
    res.send("Post deleted successfully !");
  } catch {
    res.status(404);
    res.send({ error: "Ooops!!!! Post doesn't exist!" });
  }
});
module.exports = router;
