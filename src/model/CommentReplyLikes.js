import mongoose from "mongoose";
const commentReplyLikesSchema = new mongoose.Schema({
  user: {},
  userId: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("CommentReplyLikes", commentReplyLikesSchema);
