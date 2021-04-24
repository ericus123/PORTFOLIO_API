import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  web_url: {
    type: String,
  },
  codebase_backend: {
    type: String,
  },
  codebase_front_end: {
    type: String,
  },
  image: {
    type: String,
  },
  image_public_id: {
    type: String,
    default: null
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
});


export default mongoose.model("Work", postSchema);
