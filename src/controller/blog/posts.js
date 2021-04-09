import Post from "../../model/Post";
import Comment from "../../model/Comments";
import CommentReply from "../../model/CommentReplies";
import CommentLike from "../../model/CommentLikes";
import CommentUnlike from "../../model/CommentUnlikes";
import User from "../../model/User";
import Like from "../../model/PostLikes";
import unLike from "../../model/PostUnLikes";
import Category from "../../model/Category";
import dotenv from "dotenv";
import CommentReplyLike from "../../model/CommentReplyLikes";
import CommentReplyUnLike from "../../model/CommentReplyUnlikes";
import BlogVideo from "../../model/BlogVideos";
import paginate from "jw-paginate";

var cloudinary = require("cloudinary").v2;
dotenv.config();

var uploads = {};

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class PostController {
  static async createPost(req, res) {
    try {
      const fileStr = req.body.img;
      const uploadResponse = await cloudinary.uploader.upload(fileStr);
      const category = await Category.findOne({ _id: req.body.category });
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      const post = new Post({
        title: req.body.title,
        description: req.body.description,
        author: req.user.id,
        category: req.body.category,
        imageUrl: uploadResponse.url,
      });
      const savedPost = await post.save();
      await User.findByIdAndUpdate(
        req.user.id,
        { $push: { posts: savedPost._id } },
        { new: true, useFindAndModify: false }
      );
      return res
        .status(201)
        .json({ message: "post created succesfully", article: savedPost });
    } catch (err) {
      res.status(500).json({ err: "Something went wrong", error: err });
    }
  }
  static async getPosts(req, res) {
    try {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);

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
      results.previous = [];
      for (let i = 0; i < 2; i++) {
        if (startIndex > 0) {
          results.previous.push(page - 1);
        }
      }
      // else {
      //   results.previous = {
      //     page: null,
      //     limit: limit,
      //   };
      // }
      const all = await Post.find({}).populate("category").sort({ date: -1 });
      results.maxPages = Math.ceil(all.length / limit);
      results.results = await Post.find()
        .populate("category")
        .sort({ date: -1 })
        .limit(limit)
        .skip(startIndex)
        .exec();

      return res.status(200).json({
        msg: "Posts fetched successfuly",
        postsPerPage: results,
        posts: all,
      });
      next();
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Something went wrong", err: error });
    }
  }

  static async getPost(req, res) {
    const id = req.params.id;

    try {
      const singlepost = await Post.findById(id).populate([
        {
          path: "comments",
          populate: {
            path: "replies",
          },
        },
        "likes",
        "unLikes",
        "category",
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
      await post.updateOne({
        $set: {
          title: req.body.title,
          description: req.body.description,
          category: req.body.category,
          imageUrl: req.body.url,
          updatedBy: req.user.id,
          updatedAt: Date.now(),
        },
      });
      const updatedPost = await Post.findOne({ _id: id });
      return res
        .status(201)
        .json({ message: "Post updated successfully", post: updatedPost });
    } catch {
      res.status(400).json({ error: "Can't update post" });
    }
  }

  static async deletePost(req, res) {
    try {
      const post = await Post.findOne({ _id: req.params.id });
      if (!post) return res.status(400).json({ error: "Can't find the post" });
      await post.deleteOne();
      res.status(201).json({ message: "Post deleted successfully !" });
    } catch (err) {
      res.status(400).json({ error: "Can't delete post", post: post });
    }
  }
  static async getPostsByCategory(req, res) {
    try {
      const category = await Category.find({ name: req.params.category });
      if (!category)
        return res.status(400).json({ error: "Category not found" });
      const posts = await Post.find({ category: req.params.category });
      if (!posts) return res.status(400).json({ error: "No results found!" });
      res
        .status(200)
        .json({ message: "Posts retrieved successfuly", posts: posts });
    } catch (err) {
      res.status(400).json({ error: "Can't find posts with that category" });
    }
  }
  static async createPostCat(req, res) {
    const cat = new Category({
      name: req.body.name,
      description: req.body.description,
      createdBy: req.user.id,
    });
    try {
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
            updatedAt: Date.now()
          },
        },
        { useFindAndModify: false }
      );
      return res.status(201).json({ msg: "Category is updated successfuly" });
    } catch (error) {
      return res.status(400).json({ error: "Failed to update category" });
    }
  }
  static async deleteCategory(req, res) {
    try {
      await Category.findOneAndDelete(
        { _id: req.params.category },
        { useFindAndModify: false }
      );
      return res.status(201).json({ msg: "Category deleted successfuly" });
    } catch (error) {
      return res.status(400).json({ error: "Something went wrong" });
    }
  }
  static async getPostCats(req, res) {
    try {
      const categories = await Category.find({});
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
      const category = await Category.findOne({
        _id: req.params.category,
      });
      if (!category)
        return res.status(404).json({
          error: "Category not found",
        });
      return res.status(200).json({
        msg: "Post category fetched successfuly",
        category: category,
      });
    } catch (error) {
      return res.status(400).json({ error: "Failed to get post category" });
    }
  }

  static async postComment(req, res) {
    const user = await User.findById(req.user.id);
    const comment = new Comment({
      description: req.body.description,
      user: user,
    });

    try {
      const savedComment = await comment.save();
      const id = savedComment._id;

      await Post.findByIdAndUpdate(
        req.params.postId,
        { $push: { comments: savedComment._id } },
        { new: true, useFindAndModify: false }
      );

      const post = await Post.findById(req.params.postId).populate("comments");
      res.status(201).json({ msg: "Comment saved!", comment: savedComment });
    } catch (error) {
      res.status(400).json({ error: "Failed to create comment", err: error });
    }
  }
  static async deleteComment(req, res) {
    try {
      await Comment.findOneAndDelete(
        { _id: req.params.commentId },
        { useFindAndModify: false }
      );
      res.status(201).json({ msg: "Deleted comment" });
    } catch (error) {
      res.status(400).json({ error: "Error occured" });
    }
  }
  static async editComment(req, res) {
    try {
      await Comment.findByIdAndUpdate(
        req.params.commentId,
        {
          $set: {
            description: req.body.description,
          },
        },
        { useFindAndModify: false }
      );
      return res.status(201).json({ msg: "Edited comment " });
    } catch (error) {
      return res.status(400).json({ error: "Error occured" });
    }
  }
  static async editCommentReply(req, res) {
    const commentReply = await CommentReply.findById(req.params.commentReplyId);
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(400).json({ error: "Post doesn't exist" });
    if (!commentReply)
      return res.status(404).json({ error: "Reply not found" });
    if (commentReply.user._id != req.user.id)
      return res.status(401).json({ error: "Unauthorized request" });
    try {
      await CommentReply.findByIdAndUpdate(req.params.commentReplyId, {
        $set: {
          description: req.body.description,
        },
      });
      res.status(201).json({ msg: "Edited reply" });
    } catch (error) {
      res.status(400).json({ error: "Error occured" });
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
      res.status(201).json({
        msg: "Reply saved!",
        reply: savedReply,
        commentId: req.params.commentId,
      });
    } catch (error) {
      res.status(400).json({
        error: "Failed to reply",
        err: error,
        commentId: req.params.commentId,
      });
    }
  }
  static async deleteCommentReply(req, res) {
    try {
      await CommentReply.findOneAndDelete(
        { _id: req.params.commentReplyId },
        { useFindAndModify: false }
      );
      res.status(201).json({ msg: "Deleted reply" });
    } catch (error) {
      res.status(400).json({ error: "Error occured" });
    }
  }
  static async editCommentReply(req, res) {
    try {
      await CommentReply.findByIdAndUpdate(
        req.params.commentReplyId,
        {
          $set: {
            description: req.body.description,
          },
        },
        { useFindAndModify: false }
      );
      res.status(201).json({ msg: "Edited reply" });
    } catch (error) {
      res.status(400).json({ error: "Error occured" });
    }
  }
  static async reactToThePostComment(req, res) {
    const user = await User.findById(req.user.id);
    const like = new CommentLike({
      user: user,
      userId: req.user.id,
    });
    const unlike = new CommentUnlike({
      user: user,
      userId: req.user.id,
    });

    try {
      const action = req.params.action;
      const saveLike = async () => {
        const savedLike = await like.save();
        const id = savedLike._id;
        const savedComment = await Comment.findByIdAndUpdate(
          req.params.commentId,
          { $push: { likes: savedLike._id } },
          { new: true, useFindAndModify: false }
        );

        res.status(201).json({
          msg: "liked!",
          like: savedLike,
        });
      };
      const saveUnlike = async () => {
        const savedUnLike = await unlike.save();
        const id = savedUnLike._id;

        await Comment.findByIdAndUpdate(
          req.params.commentId,
          { $push: { unLikes: savedUnLike._id } },
          { new: true, useFindAndModify: false }
        );

        res.status(201).json({
          msg: "unliked!",
          unlike: savedUnLike,
        });
      };
      const hasLiked = await CommentLike.findOne({ userId: req.user.id });
      const hasUnLiked = await CommentUnlike.findOne({ userId: req.user.id });

      if (action == "like") {
        if (hasLiked) {
          await CommentLike.deleteOne({ userId: req.user.id });
          return res.status(201).json({ msg: "Removed like" });
        } else if (hasUnLiked) {
          await CommentUnlike.deleteOne({ userId: req.user.id });
          saveLike();
        } else {
          saveLike();
        }
      } else if (action == "unlike") {
        if (hasLiked) {
          await CommentLike.deleteOne({ userId: req.user.id });
          saveUnlike();
        } else if (hasUnLiked) {
          await CommentUnlike.deleteOne({ userId: req.user.id });
          return res.status(201).json({ msg: "Removed unlike" });
        } else {
          saveUnlike();
        }
      } else {
        res.status(400).json({
          error: `reaction can't be ${action}`,
        });
      }
    } catch (error) {
      res.status(400).json({ error: `Failed to ${action} `, err: error });
    }
  }

  static async reactToThePostCommentReply(req, res) {
    const commentReply = await CommentReply.findById(req.params.replyId);
    if (!commentReply)
      return res.status(404).json({ error: "Reply not found" });
    const user = await User.findById(req.user.id);
    const like = new CommentReplyLike({
      user: user,
      userId: req.user.id,
    });
    const unlike = new CommentReplyUnLike({
      user: user,
      userId: req.user.id,
    });

    try {
      const action = req.params.action;
      const saveLike = async () => {
        const savedLike = await like.save();
        const id = savedLike._id;
        const savedComment = await CommentReply.findByIdAndUpdate(
          req.params.replyId,
          { $push: { likes: savedLike._id } },
          { new: true, useFindAndModify: false }
        );

        res.status(201).json({
          msg: "liked!",
          like: savedLike,
        });
      };
      const saveUnlike = async () => {
        const savedUnLike = await unlike.save();
        const id = savedUnLike._id;

        await CommentReply.findByIdAndUpdate(
          req.params.replyId,
          { $push: { unLikes: savedUnLike._id } },
          { new: true, useFindAndModify: false }
        );

        res.status(201).json({
          msg: "unliked!",
          unlike: savedUnLike,
        });
      };
      const hasLiked = await CommentReplyLike.findOne({ userId: req.user.id });
      const hasUnLiked = await CommentReplyUnLike.findOne({
        userId: req.user.id,
      });

      if (action == "like") {
        if (hasLiked) {
          await CommentReplyLike.deleteOne({ userId: req.user.id });
          return res.status(201).json({ msg: "Removed like" });
        } else if (hasUnLiked) {
          await CommentReplyUnLike.deleteOne({ userId: req.user.id });
          saveLike();
        } else {
          saveLike();
        }
      } else if (action == "unlike") {
        if (hasLiked) {
          await CommentReplyUnLike.deleteOne({ userId: req.user.id });
          saveUnlike();
        } else if (hasUnLiked) {
          await CommentReplyUnLike.deleteOne({ userId: req.user.id });
          return res.status(201).json({ msg: "Removed unlike" });
        } else {
          saveUnlike();
        }
      } else {
        res.status(400).json({
          error: `reaction can't be ${action}`,
        });
      }
    } catch (error) {
      res.status(400).json({ error: `Failed to ${action} `, err: error });
    }
  }
  static async reactToThePost(req, res) {
    const user = await User.findById(req.user.id);
    const like = new Like({
      user: user,
      userId: req.user.id,
    });
    const unlike = new unLike({
      user: user,
      userId: req.user.id,
    });

    try {
      const action = req.params.action;
      const saveLike = async () => {
        const savedLike = await like.save();
        const id = savedLike._id;
        const savedPost = await Post.findByIdAndUpdate(
          req.params.postId,
          { $push: { likes: savedLike._id } },
          { new: true, useFindAndModify: false }
        );

        res.status(201).json({
          msg: "liked!",
          like: savedLike,
        });
      };
      const saveUnlike = async () => {
        const savedUnLike = await unlike.save();
        const id = savedUnLike._id;

        await Post.findByIdAndUpdate(
          req.params.postId,
          { $push: { unLikes: savedUnLike._id } },
          { new: true, useFindAndModify: false }
        );

        res.status(201).json({
          msg: "unliked!",
          unlike: savedUnLike,
        });
      };
      const hasLiked = await Like.findOne({ userId: req.user.id });
      const hasUnLiked = await unLike.findOne({ userId: req.user.id });

      if (action == "like") {
        if (hasLiked) {
          await Like.deleteOne({ userId: req.user.id });
          return res.status(201).json({ msg: "Removed like" });
        } else if (hasUnLiked) {
          await unLike.deleteOne({ userId: req.user.id });
          saveLike();
        } else {
          saveLike();
        }
      } else if (action == "unlike") {
        if (hasLiked) {
          await Like.deleteOne({ userId: req.user.id });
          saveUnlike();
        } else if (hasUnLiked) {
          await unLike.deleteOne({ userId: req.user.id });
          return res.status(201).json({ msg: "Removed unlike" });
        } else {
          saveUnlike();
        }
      } else {
        return res.status(400).json({
          error: `reaction can't be ${action}`,
        });
      }
    } catch (error) {
      res
        .status(400)
        .json({ error: `Failed to ${req.params.action} `, err: error });
    }
  }
  static async searchPosts(req, res) {
    try {
      const query = req.query.term;
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
      ]);

      res.status(200).json({
        msg: "Search results retrieved successfuly",
        posts: posts,
      });
    } catch (error) {
      res.status(400).json({ error: "Error occurred", err: error });
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
      res.status(201).json({ msg: "Video added succesfuly", video: saveVideo });
    } catch (error) {
      res.status(400).json({ error: "Something went wrong", err: error });
    }
  }
  static async getBlogVideos(req, res) {
    try {
      const videos = await BlogVideo.find({}).populate("author");
      res
        .status(200)
        .json({ msg: "Videos fetched successfuly", videos: videos });
    } catch (error) {
      res.status(400).json({ error: "Something went wrong", err: error });
    }
  }
  static async updateBlogVideo(req, res) {
    try {
      const video = await BlogVideo.findById(req.params.id);
      console.log(video);
      if (!video) {
        res.status(404).json({ error: "Video not found" });
      }
      await video.updateOne({
        $set: {
          author: req.user.id,
          link: req.body.link,
          description: req.body.description,
        },
      });
      res.status(201).json({ msg: "Video updated successfuly", video: video });
    } catch (error) {
      res.status(400).json({ error: "Something went wrong", err: error });
    }
  }
}
export default PostController;
