import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    min: 6,
    required: true,
    email: true,
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
