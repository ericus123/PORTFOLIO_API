import Post from "../model/Post";
import Comment from "../model/Comments";
import Category from "../model/Category";
import CommentReply from "../model/CommentReplies";
import crypto from "crypto";

class PostsMiddleware {
  static async checkPostComment(req, res, next) {
    try {
      const post = await Post.findOne({ _id: req.params.postId });
      const comment = await Comment.findById(req.params.commentId);

      if (!post) res.status(400).json({ error: "Post doesn't exist" });

      if (!comment) res.status(400).json({ error: "Comment doesn't exist" });

      next();
    } catch (error) {
      return res.status(400).json({ error: "Something went wrong" })
    }
  }
  static async checkOwner(req, res, next) {
    try {
      if ((req.method = "PATCH" && comment.user._id != req.user.id)) {
        res.status(401).json({ error: "Unauthorized request" });
      }
      next();
    } catch (error) {
      return res.status(400).json({ error: "Something went wrong" })
    }
  }
  static async checkPostCommentReply(req, res, next) {
    const commentReply = await CommentReply.findById(req.params.replyId);
    if (!commentReply)
      return res.status(404).json({ error: "Reply not found" });
    if (commentReply.user._id != req.user.id)
      return res.status(401).json({ error: "Unauthorized request" });
    next();
  }

  static async postExist(req, res, next) {
    try {
      const post = await Post.findById(req.params.postId);
      if (!post) return res.status(404).json({ error: "Post not found" });
      next();
    } catch (error) {
      return res.status(400).json({ error: "Something went wrong" })
    }
  }
  static async commentExist(req, res, next) {
    try {
      const comment = await Comment.findById(req.params.commentId);
      if (!comment) return res.status(404).json({ error: "Comment not found" });
      next();
    } catch (error) {
      return res.status(400).json({ error: "Something went wrong" })
    }

  }
  static async replyExist(req, res, next) {
    try {
      const reply = await CommentReply.findById(req.params.replyId);
      if (!reply) return res.status(404).json({ error: "Post not found" });
      next();
    } catch (error) {
      return res.status(400).json({ error: "Something went wrong" })
    }
  }
  static async checkCategory(req, res, next) {
    try {
      const category = await Category.findOne({ name: req.body.name });
      if (category) return res.status(400).json({ error: "Name already exist" });
      next();
    } catch (error) {
      return res.status(400).json({ error: "Something went wrong" })
    }
  }
  static async checkCategoryUpdate(req, res, next) {
    try {
      const category = await Category.findOne({ _id: req.params.category });
      if (!category) return res.status(404).json({ error: "Category not found" });
      next();
    } catch (error) {
      return res.status(400).json({ error: "Something went wrong" })
    }
  }
  static async checkCatCreation(req, res, next) {
    try {
      const category = await Category.findOne({ name: req.body.name });
      if (category) {
        return res.status(400).json({ error: "Category name already exist" });
      }
      next();
    } catch (error) {
      return res.status(400).json({ error: "Something went wrong" })
    }
  }
  static async checkPostTitle(req, res, next) {
    try {
      let { title } = req.body;
      const post = await Post.findOne({ title: title });
      if (post) {
        title = title.concat("-" + crypto.randomBytes(1).toString("hex"));
      }
      req.title = title;
      next();
    } catch (error) {
      return res.status(400).json({ error: "Something went wrong" })
    }
  }
}

export default PostsMiddleware;
