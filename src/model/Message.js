import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
  names: {
    type: String,
    min: 6,
    max: 20,
    required: true,
  },
  email: {
    type: String,
    min: 6,
    required: true,
    email: true,
  },
  country: {
    type: String,
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
