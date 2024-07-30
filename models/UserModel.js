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
  Team: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
