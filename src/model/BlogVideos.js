import mongoose from "mongoose";

const blogVideosSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  link: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  CreatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("BlogVideos", blogVideosSchema);
