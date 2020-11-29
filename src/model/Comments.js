import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
  user: {},
  description: {
    type: String,
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CommentReplies",
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CommentLikes",
    },
  ],
  unLikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CommentUnLikes",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Comments", commentSchema);
