import mongoose from "mongoose";
const replyReactionsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  replyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CommentReplies",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("ReplyReactions", replyReactionsSchema);
