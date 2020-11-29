import mongoose from "mongoose";
const postUnLikesSchema = new mongoose.Schema({
  user: {},
  userId: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("PostUnLikes", postUnLikesSchema);
