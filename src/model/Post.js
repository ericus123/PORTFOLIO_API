import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 6,
  },
  description: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  category: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PostLikes",
    },
  ],
  unLikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PostUnLikes",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Posts", postSchema);
