const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  //  maybe how we connect to other collection
  // posts: [{ type: mongoose.Schema.ObjectId, ref: "Teams" }],
});

module.exports = mongoose.model("User", userSchema);
