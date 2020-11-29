import mongoose from "mongoose";
const commentLikesSchema = new mongoose.Schema({
  user: {},
  userId: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("CommentLikes", commentLikesSchema);
