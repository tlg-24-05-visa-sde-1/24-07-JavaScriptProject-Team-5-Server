const mongoose = require("mongoose");

const teamSchema = new Schema({
  teamName: { type: String, required: true },
  players: {
    type: [{ type: Schema.Types.ObjectId, ref: "Player" }],
  },
  rating: {
    type: Double,
  },
});

const Team = mongoose.model("Team", teamSchema);

module.exports = { Team };
