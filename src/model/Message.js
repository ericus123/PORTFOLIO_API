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
});

export default mongoose.model("Message", messageSchema);
