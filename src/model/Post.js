import mongoose from "mongoose";
import slugify from "slugify";
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
  slug: {
    type: String,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

postSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});
export default mongoose.model("Posts", postSchema);
