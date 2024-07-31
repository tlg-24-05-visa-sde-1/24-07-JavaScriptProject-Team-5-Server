const express = require("express");
const Player = require("../models/PlayerModel");
const router = express.Router();

// Get All Players Route Handler
router.get("/allPlayers", async (req, res) => {
  try {
    const playerList = await Player.find();
    if (!playerList) {
      return res.status(404).json({ Error: "Can't get players" });
    }
    // Send back players if found
    res.status(200).json(playerList);
  } catch (error) {
    res.status(500).json({ Error: "Server error getting players", error });
  }
});

module.exports = router;
