const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  playerName: { type: String },
  position: { type: String },
  age: { type: Number },
  games: { type: Number },
  gamesStarted: { type: Number },
  minutesPg: { type: Number },
  fieldGoals: { type: Number },
  fieldAttempts: { type: Number },
  fieldPercent: { type: Number },
  threeFg: { type: Number },
  threeAttempts: { type: Number },
  fieldPercent: { type: Number },
  threeFg: { type: Number },
  threeAttempts: { type: Number },
  threePercent: { type: Number },
  twoFg: { type: Number },
  twoAttempts: { type: Number },
  twoPercent: { type: Number },
  effectFgPercent: { type: Number },
  ft: { type: Number },
  ftAttempts: { type: Number },
  ftPercent: { type: Number },
  offensiveRb: { type: Number },
  defensiveRb: { type: Number },
  totalRb: { type: Number },
  assists: { type: Number },
  steals: { type: Number },
  blocks: { type: Number },
  turnovers: { type: Number },
  personalFouls: { type: Number },
  points: { type: Number },
  team: { type: String },
  season: { type: Number },
  playerId: { type: String },
  imageUrl: {
    type: String,
    default:
      "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1641737.png",
  },
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
