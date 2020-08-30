import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
  },
  email: {
    type: String,
    min: 6,
    required: true,
    email: true,
  },
  country: {
    type: String,
    min: 30,
    required: true,
  },
  message: {
    type: String,
    min: 6,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Message", messageSchema);
