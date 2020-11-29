import mongoose from "mongoose";
const tokenSchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});
tokenSchema.methods.hasExpired = function () {
  var now = Date.now();
  return now - Date.parse(createDate) > 1000; // Date is converted to milliseconds to calculate 7 days it > one day = 24 hours * 60 minutes * 60 seconds *1000 milliseconds * 7 days = 604800000
};
export default mongoose.model("PassResetToken", tokenSchema);
