import Post from "../../model/Post";
import Comment from "../../model/Comments";
import CommentReply from "../../model/CommentReplies";
import CommentReaction from "../../model/CommentReactions";
import User from "../../model/User";
import PostReaction from "../../model/PostReactions";
import Category from "../../model/Category";
import dotenv from "dotenv";
import ReplyReaction from "../../model/CommentReplyReactions";
import BlogVideo from "../../model/BlogVideos";
import { uploadImage, deleteImage } from "../../helpers/images/index";

dotenv.config();

class PostController {
  static async createPost(req, res) {
    try {
      const { title, description, category, img } = req.body;
      const _category = await Category.findOne({ _id: category });
      if (!_category) {
        return res.status(404).json({ error: "Category not found" });
      }
      const uploaded_image = await uploadImage(img, "/Blog/Posts");
      const post = new Post({
        title: req.title,
        description: description,
        author: req.user.id,
        category: _category,
        imageUrl: uploaded_image.secure_url,
        image_public_id: uploaded_image.public_id,
      });
      const savedPost = await post.save();
      await User.findByIdAndUpdate(
        req.user.id,
        { $push: { posts: savedPost._id } },
        { new: true, useFindAndModify: false }
      );
      return res
        .status(201)
        .json({ message: "Post created succesfully", article: savedPost });
    } catch (err) {
      return res.status(500).json({ err: "Something went wrong", error: err });
    }
  }
  static async getPostsAll(req, res) {
    try {
      const posts = await Post.find().populate([
        "category",
        {
          path: "author",
          select: ["avatar", "gender", "email", "fisrtName", "lastName"],
        },
      ]);

      return res
        .status(200)
        .json({ msg: "Posts retrieved successfuly", posts: posts });
    } catch (error) {
      return res
        .status(500)
        .json({ err: error, error: "Something went wrong" });
    }
  }
  static async getPosts(req, res) {
    const { status } = req.params;
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const results = {};

      if (endIndex < (await Post.countDocuments().exec())) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      } else {
        results.next = {
          page: null,
          limit: limit,
        };
      }
      for (let i = 0; i < 2; i++) {
        if (startIndex > 0) {
          results.previous = {
            page: page - 1,
            limit: limit,
          };
        } else {
          results.previous = {
            page: null,
            limit: limit,
          };
        }
      }

      const all = await Post.find({ status: status })
        .sort({ createdAt: -1 })
        .exec();

      if (all.length) {
        results.maxPages = Math.ceil(all.length / limit);
        results.results = await Post.find({ status: status })
          .sort({ createdAt: -1 })
          .limit(limit)
          .skip(startIndex)
          .exec();
      } else {
        results.results = [];
      }

      return res.status(200).json({
        msg: "Posts fetched successfuly",
        postsPerPage: results,
        posts: all,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Something went wrong", err: error });
    }
  }

  static async getPost(req, res) {
    const slug = req.params.slug;
    try {
      const singlepost = await Post.find({ slug }).populate([
        "category",
        {
          path: "comments",
          model: "Comments",
          populate: {
            path: "replies",
          },
        },
        "likes",
        "category",
        {
          path: "author",
          select: ["avatar", "gender", "email", "firstName", "lastName","bio",],
        },
      ]);
      res
        .status(200)
        .json({ msg: "Post retrieved successfuly", post: singlepost });
    } catch (error) {
      res.status(400).json({ error: "Something went wrong", err: error });
    }
  }
  static async updatePost(req, res) {
    const id = req.params.id;
    try {
      const post = await Post.findOne({ _id: id });
      if (!post) return res.status(400).json({ error: "Can't find post" });
      const { description, category, img } = req.body;
      const _category = await Category.findOne({ _id: category });
      if (!_category) {
        return res.status(404).json({ error: "Category not found" });
      }
      const uploaded_image = await uploadImage(img, "/Blog/Posts");
      await deleteImage(post.image_public_id);
      await post.updateOne({
        $set: {
          title: req.title,
          description: description,
          category: category,
          imageUrl: uploaded_image.secure_url,
          updatedBy: req.user.id,
          image_public_id: uploaded_image.public_id,
          updatedAt: Date.now(),
          updatedBy: req.user.id,
        },
      });
      const updatedPost = await Post.findOne({ _id: id });
      return res
        .status(201)
        .json({ message: "Post updated successfully", post: updatedPost });
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Something went wrong", err: error });
    }
  }

  static async deletePost(req, res) {
    try {
      const post = await Post.findOne({ _id: req.params.id });
      if (!post) return res.status(400).json({ error: "Can't find the post" });
      await post.deleteOne();
      await deleteImage(post.image_public_id);
      return res.status(201).json({ message: "Post deleted successfully !" });
    } catch (err) {
      return res.status(400).json({ error: "Can't delete post", post: post });
    }
  }
  static async getPostsByCategory(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const results = {};

      const category = await Category.findOne({ name: req.params.category });
      if (!category) {
        return res
          .status(400)
          .json({ error: "Can't fing what you are looking for :(" });
      }
      const posts = await Post.find({
        category: category._id,
        status: "active",
      });
      if (!posts) return res.status(400).json({ error: "No results found!" });

      if (endIndex < posts.length) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      } else {
        results.next = {
          page: null,
          limit: limit,
        };
      }

      results.maxPages = Math.ceil(posts.length / limit);
      for (let i = 0; i < 2; i++) {
        if (startIndex > 0) {
          results.previous = {
            page: page - 1,
            limit: limit,
          };
        } else {
          results.previous = {
            page: null,
            limit: limit,
          };
        }
      }
      results.results = posts.slice(startIndex, startIndex + limit);
      return res.status(200).json({
        message: "Posts fetched successfuly",
        postsPerPage: results,
        posts: posts,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Something went wrong", err: error });
    }
  }
  static async createPostCat(req, res) {
    try {
      const cat = new Category({
        name: req.body.name,
        description: req.body.description,
        createdBy: req.user.id,
      });
      await cat.save();
      return res
        .status(201)
        .json({ msg: "Category is created successfuly", category: cat });
    } catch (error) {
      return res.status(400).json({ error: "Failed to create category" });
    }
  }
  static async updatePostCat(req, res) {
    try {
      const category = await Category.findByIdAndUpdate(
        req.params.category,
        {
          $set: {
            name: req.body.name,
            description: req.body.description,
            updatedBy: req.user.id,
            updatedAt: Date.now(),
          },
        },
        { useFindAndModify: false }
      );
      return res.status(201).json({ msg: "Category updated successfuly" });
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Something went wrong", err: error });
    }
  }
  static async deleteCategory(req, res) {
    try {
      await req.category.deleteOne();
      return res.status(201).json({ msg: "Category deleted successfully" });
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Something went wrong", err: error });
    }
  }
  static async getPostCats(req, res) {
    try {
      const categories = await Category.find();
      return res.status(200).json({
        msg: "Post categories fetched successfuly",
        categories: categories,
      });
    } catch (error) {
      return res.status(400).json({ error: "Failed to get post category" });
    }
  }
  static async getPostCat(req, res) {
    try {
      return res.status(200).json({
        msg: "Post category fetched successfuly",
        category: req.category,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Something went wrong", err: error });
    }
  }

  static async postComment(req, res) {
    try {
      const { description } = req.body;
      const comment = new Comment({
        description: description,
        user: req.user.id,
        postId: req.params.postId,
      });

      const savedComment = await comment.save();
      const id = savedComment._id;

      await Post.findByIdAndUpdate(
        req.params.postId,
        { $push: { comments: savedComment._id } },
        { new: true, useFindAndModify: false }
      );
      return res
        .status(201)
        .json({ msg: "Comment saved!", comment: savedComment });
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Something went wrong", err: error });
    }
  }
  static async deleteComment(req, res) {
    try {
      if (req.comment.user._id != req.user.id) {
        return res.status(401).json({ error: "Unauthorized request" });
      }
      await Comment.findOneAndDelete(
        { _id: req.params.commentId },
        { useFindAndModify: false }
      );
      return res.status(201).json({ msg: "Deleted" });
    } catch (error) {
      return res.status(400).json({ error: "Error occured" });
    }
  }
  static async editComment(req, res) {
    try {
      if (req.comment.user._id != req.user.id) {
        return res.status(401).json({ error: "Unauthorized request" });
      }
      await Comment.findByIdAndUpdate(
        req.params.commentId,
        {
          $set: {
            description: req.body.description,
            updatedAt: Date.now(),
          },
        },
        { useFindAndModify: false }
      );
      return res.status(201).json({ msg: "Updated" });
    } catch (error) {
      return res.status(400).json({ error: "Something went wrong" });
    }
  }
  static async getComment(req, res) {
    try {
      const { commentId } = req.params;
      const comment = await Comment.findById(commentId).populate([
        {
          path: "replies",
          model: "CommentReplies",
          populate: {
            path: "likes",
            model: "ReplyReactions",
          },
        },
        {
          path: "replies",
          model: "CommentReplies",
          populate: {
            path: "user",
            model: "User",
          },
        },
        "likes",
        "user",
      ]);
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
      return res
        .status(201)
        .json({ msg: "Comment fetched successfully", comment: comment });
    } catch (error) {
      return res.status(400).json({ error: "Something went wrong" });
    }
  }
  static async getComments(req, res) {
    try {
      const { postId } = req.params;
      const comments = await Comment.find({ postId: postId }).populate([
        {
          path: "replies",
          model: "CommentReplies",
          populate: {
            path: "likes",
            model: "ReplyReactions",
          },
        },
        {
          path: "replies",
          model: "CommentReplies",
          populate: {
            path: "user",
            model: "User",
          },
        },
        "likes",
        "user",
      ]);
      return res
        .status(201)
        .json({ msg: "Comments fetched successfully", comments: comments });
    } catch (error) {
      return res.status(400).json({ error: "Something went wrong" });
    }
  }
  static async editCommentReply(req, res) {
    try {
      if (req.reply.user._id != req.user.id)
        return res.status(401).json({ error: "Unauthorized request" });
      const reply = await CommentReply.findByIdAndUpdate(
        req.params.replyId,
        {
          $set: {
            description: req.body.description,
            updatedAt: Date.now(),
          },
        },
        { useFindAndModify: false }
      );
      return res.status(201).json({ msg: "Updated", reply: reply });
    } catch (error) {
      return res.status(400).json({ error: "Something went wrong" });
    }
  }

  static async postCommentReply(req, res) {
    try {
      const user = await User.findById(req.user.id);

      const commentReply = new CommentReply({
        description: req.body.description,
        user: user,
      });
      const savedReply = await commentReply.save();
      const id = savedReply._id;

      await Comment.findByIdAndUpdate(
        req.params.commentId,
        { $push: { replies: savedReply._id } },
        { new: true, useFindAndModify: false }
      );
      return res.status(201).json({
        msg: "Reply saved!",
        reply: savedReply,
        commentId: req.params.commentId,
      });
    } catch (error) {
      return res.status(400).json({
        error: "Something went wrong",
        err: error,
        commentId: req.params.commentId,
      });
    }
  }
  static async deleteCommentReply(req, res) {
    try {
      if (req.reply.user._id != req.user.id)
        return res.status(401).json({ error: "Unauthorized request" });
      await CommentReply.findOneAndDelete(
        { _id: req.params.replyId },
        { useFindAndModify: false }
      );
      return res.status(201).json({ msg: "Deleted" });
    } catch (error) {
      return res.status(400).json({ error: "Something went wrong" });
    }
  }

  static async reactToThePostComment(req, res) {
    try {
      const { commentId } = req.params;
      const hasLiked = await CommentReaction.findOne({
        commentId: commentId,
        user: req.user.id,
      });
      if (hasLiked) {
        await hasLiked.delete();
        return res.status(201).json({ msg: "Unliked" });
      }
      const like = new CommentReaction({
        user: req.user.id,
        commentId: commentId,
      });
      const savedLike = await like.save();
      await Comment.findByIdAndUpdate(
        req.params.commentId,
        { $push: { likes: savedLike._id } },
        { new: true, useFindAndModify: false }
      );
      return res.status(201).json({ msg: "Liked", like: savedLike });
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Something went wrong", err: error });
    }
  }

  static async reactToThePostCommentReply(req, res) {
    try {
      const { replyId } = req.params;
      const hasLiked = await ReplyReaction.findOne({
        replyId: replyId,
        user: req.user.id,
      });
      if (hasLiked) {
        await hasLiked.delete();
        return res.status(201).json({ msg: "Unliked" });
      }
      const like = new ReplyReaction({
        user: req.user.id,
        replyId: replyId,
      });
      const savedLike = await like.save();
      await CommentReply.findByIdAndUpdate(
        req.params.replyId,
        { $push: { likes: savedLike._id } },
        { new: true, useFindAndModify: false }
      );
      return res.status(201).json({ msg: "Liked", like: savedLike });
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Something went wrong", err: error });
    }
  }
  static async reactToThePost(req, res) {
    try {
      const { postId } = req.params;
      const hasLiked = await PostReaction.findOne({
        user: req.user.id,
        postId: postId,
      });
      if (hasLiked) {
        await hasLiked.delete();
        return res.status(201).json({ msg: "Unliked" });
      }
      const like = new PostReaction({
        user: req.user.id,
        postId: postId,
      });
      const savedLike = await like.save();
      await Post.findByIdAndUpdate(
        postId,
        { $push: { likes: savedLike._id } },
        { new: true, useFindAndModify: false }
      );
      return res.status(201).json({ msg: "Liked", like: savedLike });
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Something went wrong", err: error });
    }
  }
  static async getPostReactions(req, res) {
    try {
      const { postId } = req.params;
      const likes = await PostReaction.find({ postId: postId });
      return res
        .status(200)
        .json({ msg: "Likes fetched successfully", likes: likes });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Something went wrong", err: error });
    }
  }
  static async searchPosts(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const results = {};

      const query = req.query.term.trim();
      if (!query) {
        return res.status(400).json({ error: "Search term is required" });
      }
      const posts = await Post.aggregate([
        {
          $search: {
            text: {
              query: req.query.term,
              path: ["description", "title"],
            },
          },
        },
      ]).then((res) => res.filter((post) => post.status === "active"));

      if (endIndex < posts.length) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      } else {
        results.next = {
          page: null,
          limit: limit,
        };
      }

      results.maxPages = Math.ceil(posts.length / limit);
      for (let i = 0; i < 2; i++) {
        if (startIndex > 0) {
          results.previous = {
            page: page - 1,
            limit: limit,
          };
        } else {
          results.previous = {
            page: null,
            limit: limit,
          };
        }
      }
      results.results = posts
        .slice(startIndex, startIndex + limit)
        .filter((post) => post.status === "pending");
      return res.status(200).json({
        msg: "Search results retrieved successfuly",
        term: query,
        postsPerPage: results,
        posts: posts,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Error occurred", err: error });
    }
  }
  static async createBlogVideo(req, res) {
    try {
      const video = new BlogVideo({
        author: req.user.id,
        link: req.body.link,
        description: req.body.description,
      });
      const saveVideo = await video.save();
      return res
        .status(201)
        .json({ msg: "Video added succesfuly", video: saveVideo });
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Something went wrong", err: error });
    }
  }
  static async getBlogVideos(req, res) {
    try {
      const videos = await BlogVideo.find({}).populate("author");
      return res
        .status(200)
        .json({ msg: "Videos fetched successfuly", videos: videos });
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Something went wrong", err: error });
    }
  }
  static async updateBlogVideo(req, res) {
    try {
      const video = await BlogVideo.findById(req.params.id);
      if (!video) {
        return res.status(404).json({ error: "Video not found" });
      }
      await video.updateOne({
        $set: {
          author: req.user.id,
          link: req.body.link,
          description: req.body.description,
        },
      });
      return res
        .status(201)
        .json({ msg: "Video updated successfuly", video: video });
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Something went wrong", err: error });
    }
  }
}
export default PostController;
