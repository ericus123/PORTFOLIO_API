import Post from "../model/Post";
import Comment from "../model/Comments";
import Category from "../model/Category";
import CommentReply from "../model/CommentReplies";
import crypto from "crypto";

class PostsMiddleware {
  static async checkPostComment(req, res, next) {
    const post = await Post.findOne({ _id: req.params.postId });
    const comment = await Comment.findById(req.params.commentId);

    if (!post) res.status(400).json({ error: "Post doesn't exist" });

    if (!comment) res.status(400).json({ error: "Comment doesn't exist" });

    next();
  }
  static async checkOwner(req, res, next) {
    if ((req.method = "PATCH" && comment.user._id != req.user.id)) {
      res.status(401).json({ error: "Unauthorized request" });
    }
    next();
  }
  static async checkPostCommentReply(req, res, next) {
    const commentReply = await CommentReply.findById(req.params.replyId);
    if (!commentReply)
      return res.status(404).json({ error: "Reply not found" });
    if (commentReply.user._id != req.user.id)
      return res.status(401).json({ error: "Unauthorized request" });
    next();
  }
  static async checkPostReaction(req, res, next) {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(400).json({ error: "Post doesn't exist" });

    next();
  }
  static async checkCategory(req, res, next) {
    const category = await Category.findOne({ name: req.body.name });
    if (category) return res.status(400).json({ error: "Name already exist" });
    next();
  }
  static async checkCategoryUpdate(req, res, next) {
    const category = await Category.findOne({ _id: req.params.category });
    if (!category) return res.status(404).json({ error: "Category not found" });
    next();
  }
  static async checkCatCreation(req, res, next) {
    const category = await Category.findOne({ name: req.body.name });
    if (category) {
      return res.status(400).json({ error: "Category name already exist" });
    }
    next();
  }
  static async checkPostTitle(req, res, next) {
    let { title } = req.body;
    const post = await Post.findOne({ title: title });
    if (post) {
      title = title.concat("-" + crypto.randomBytes(1).toString("hex"));
    }
    req.title = title;
    next();
  }
}

export default PostsMiddleware;
