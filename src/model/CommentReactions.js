import mongoose from "mongoose";
const commentReactionsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comments",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("CommentReactions", commentReactionsSchema);
