import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 14,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  bio: {
    type: String,
    required: true,
    min: 15,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  onlinestatus: {
    type: String,
    default: "inactive",
  },
  role: {
    type: String,
    default: "basic",
    enum: ["basic", "admin", "superAdmin"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
