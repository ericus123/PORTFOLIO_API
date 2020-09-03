import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
  email: {
    type: String,
    min: 6,
    required: true,
    email: true,
  },
  subject: {
    type: String,
    min: 6,
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
