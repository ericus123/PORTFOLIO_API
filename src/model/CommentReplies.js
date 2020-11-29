import mongoose from "mongoose";
const commentRepliesSchema = new mongoose.Schema({
  user: {},
  description: {},
  date: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CommentReplyLikes",
    },
  ],
  unLikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CommentReplyUnLikes",
    },
  ],
});

export default mongoose.model("CommentReplies", commentRepliesSchema);
