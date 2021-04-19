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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
  },
  imageUrl: {
    type: String,
  },
  image_public_id: {
    type: String,
    default: null
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
      ref: "PostReactions",
    },
  ],
  slug: {
    type: String,
    unique: true,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
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

postSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});
export default mongoose.model("Posts", postSchema);
