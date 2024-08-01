const express = require("express");
const router = express.Router();

//bring in models
const Player = require("../models/PlayerModel");
const Team = require("../models/TeamModel");

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

// Put - add player to team route handler
router.put("/addPlayer", async (req, res) => {
  try {
    const { playerId, userId } = req.body; // Player ID from the body

    // Find the team associated with the userId
    const team = await Team.findOne({ owner: userId }); // 'owner' is the field referencing userId

    //If team doesn't exist send error
    if (!team) {
      return res.status(404).json({ Error: "Team not found for this user" });
    }

    // Log for debugging
    console.log(
      `Received playerId: ${playerId}, team.players: ${team.players}`
    );
    // Check if the player is already in the players array to avoid duplicates
    if (team.players.includes(playerId)) {
      return res
        .status(400)
        .json({ Error: "Player already added to this team" });
    }

    // Update the team to include the new player's ID
    team.players.push(playerId);
    const updatedTeam = await team.save(); // Save and get the updated team

    res.status(200).json({
      Success: "Player successfully added to Team",
      updatedTeam: updatedTeam,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({ Error: "Server error adding player to team", error });
  }
});

//Delete - remove player from team
router.delete("/removePlayer", async (req, res) => {
  const { playerId, userId } = req.body;

  try {
    // Find the team associated with the userId
    // 'owner' is the field referencing userId
    const team = await Team.findOne({ owner: userId });

    // If team doesn't exist, send error
    if (!team) {
      return res.status(404).json({ Error: "Team not found for this user" });
    }

    // Find the player in players array
    const playerInPlayersArray = team.players.includes(playerId);

    //return error if they're not in it
    if (!playerInPlayersArray) {
      return res.status(400).json({ Error: "Player not found on this team" });
    }

    // Remove the player from the team completely by removing them from players, starters, and benchPlayers arrays
    const updatedTeam = await Team.findByIdAndUpdate(
      team._id,
      {
        $pull: {
          players: playerId,
          starters: playerId,
          benchPlayers: playerId,
        },
      },
      { new: true } // Return the updated team info from Mongo
    );

    res.status(200).json({
      Success: "Player successfully removed from Team",
      updatedTeam,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ Error: "Server error removing player from team", error });
  }
});

//routes for bench and starters
router.put("/addToStarters", async (req, res) => {
  const { playerId, teamId } = req.body;

  try {
    // Find and update the team
    const team = await Team.findByIdAndUpdate(
      teamId,
      {
        $addToSet: { starters: playerId }, // Add player to starters if not already present
        $pull: { benchPlayers: playerId }, // Remove player from benchPlayers if present
      },
      { new: true } // Return the updated document
    );

    if (!team) {
      return res.status(404).json({ Error: "Team not found" });
    }

    res
      .status(200)
      .json({ message: "Player added to starters successfully", team });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ Error: "Server error adding player to starting lineup", error });
  }
});

router.put("/addToBench", async (req, res) => {
  const { playerId, teamId } = req.body;

  try {
    // Find and update the team
    const team = await Team.findByIdAndUpdate(
      teamId,
      {
        $addToSet: { benchPlayers: playerId }, // Add player to benchPlayers if not already present
        $pull: { starters: playerId }, // Remove player from starters if present
      },
      { new: true } // Return the updated document
    );

    if (!team) {
      return res.status(404).json({ Error: "Team not found" });
    }

    res
      .status(200)
      .json({ message: "Player added to bench successfully", team });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ Error: "Server error adding player to bench", error });
  }
});

module.exports = router;
