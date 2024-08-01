const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  players: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
  },
  rating: {
    type: Number,
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
