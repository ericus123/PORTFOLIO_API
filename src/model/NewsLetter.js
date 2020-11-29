import mongoose from "mongoose";

const newsLetterSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.model("NewsLetter", newsLetterSchema);
