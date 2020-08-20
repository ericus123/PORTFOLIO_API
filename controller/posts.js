const verify = require("../middleware/verifyToken");
const Post = require("../model/Post");
const createpostController = async (req, res) => {
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
};

const getallpostsController = function (req, res) {
  Post.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

const getsinglepostController = async (req, res) => {
  const id = req.params.id;

  try {
    const singlepost = await Post.findOne({ _id: id });
    res.send(singlepost);
  } catch {
    res.status(404).send({ message: "Error retrieving post with id=" + id });
  }
};
const updatepostController = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findOne({ _id: id });

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
};

const deletepostController = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    await post.deleteOne();
    res.send("Post deleted successfully !");
  } catch {
    res.status(404);
    res.send({ error: "Ooops!!!! Post doesn't exist!" });
  }
};
module.exports.createpostController = createpostController;
module.exports.getallpostsController = getallpostsController;
module.exports.getsinglepostController = getsinglepostController;
module.exports.updatepostController = updatepostController;
module.exports.deletepostController = deletepostController;
