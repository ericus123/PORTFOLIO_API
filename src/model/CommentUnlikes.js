import mongoose from "mongoose";
const commentUnLikesSchema = new mongoose.Schema({
  user: {},
  userId: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("CommentUnLikes", commentUnLikesSchema);
