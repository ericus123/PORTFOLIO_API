import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
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
      ref: "CommentReactions",
    },
  ],
});

export default mongoose.model("Comments", commentSchema);
