const mongoose = require("mongoose");

const playerSchema = new Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  team: { type: Schema.Types.ObjectId, ref: "Team" },
});

const Player = mongoose.model("Player", playerSchema);

module.exports = { Player };
