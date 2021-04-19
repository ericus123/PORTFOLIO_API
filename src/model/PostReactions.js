import mongoose from "mongoose";
const postReactionsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Posts",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("PostReactions", postReactionsSchema);
