const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  players: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
    validate: {
      validator: function (array) {
        return array.length <= 12;
      },
      message: "The team cannot have more than 12 players.",
    },
  },
  starters: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
    default: [],
    validate: {
      validator: function (array) {
        return array.length <= 5;
      },
      message: "The team cannot have more than 5 starters.",
    },
  },
  benchPlayers: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
    default: [],
  },
  rating: {
    type: Number,
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
