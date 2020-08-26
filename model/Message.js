const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
  names: {
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

module.exports = mongoose.model("Message", messageSchema);
