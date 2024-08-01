const express = require("express");
const Team = require("../models/TeamModel");
const router = express.Router();

//Team route handlers
//Add a Get followed teams if we decide to implement following/followers functionality

//Post- Create team route
router.post("/createTeam", async (req, res) => {
  try {
    // Pull out data from body.
    const { teamName, userId } = req.body;
    // Save data to a variable
    const newTeam = new Team({
      teamName,
      owner: userId,
    });
    //save to DB- if successful return to client, if not return error
    try {
      const savedTeam = await newTeam.save();
      // Send back the new Team
      res.status(200).json(savedTeam);
      console.log(savedTeam);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error saving team" });
  }
});
//Delete team route

router.delete("/deleteTeam", async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the team by owner (userId)
    const myTeam = await Team.findOne({ owner: userId });

    // Handle case of no team found
    if (!myTeam) {
      return res.status(404).json({ error: "Team not found in database" });
    }

    // Delete the team
    const result = await Team.deleteOne({ _id: myTeam._id });

    // Handle case where the deletion fails
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Team not found in database" });
    }

    // Send success response
    res.json({ message: "Team successfully deleted", result });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Server error deleting team", details: error.message });
  }
});


//Get team route
router.get("/myTeam", async (req, res) => {
  try {
    const { userId } = req.query;
    console.log("Received userId:", userId);

    if (!userId) {
      console.log("No userId provided");
      return res.status(400).json({ Error: "userId is required" });
    }

    console.log("Searching for team with owner:", userId);
    const myTeam = await Team.findOne({ owner: userId });

    if (!myTeam) {
      console.log("No team found for userId:", userId);
      return res.status(404).json({ Error: "Team not found" });
    }

    console.log("Team found:", myTeam);
    res.json(myTeam);
  } catch (error) {
    console.error("Server error getting Team:", error);
    res.status(500).json({ Error: "Server error getting Team", error: error.message });
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
      players: updatedTeam.players, // Return the updated list of players
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({ Error: "Server error adding player to team", error });
  }
});

router.delete("/removePlayer", async (req, res) => {
  try {
    const { playerId, userId } = req.body; // Player ID from the body

    // Find the team associated with the userId
    const team = await Team.findOne({ owner: userId }); // 'owner' is the field referencing userId

    // If team doesn't exist, send error
    if (!team) {
      return res.status(404).json({ Error: "Team not found for this user" });
    }

    // Log for debugging
    console.log(
      `Received playerId: ${playerId}, team.players: ${team.players}`
    );
    // Check if the player is in the players array

    // Trim and clean the playerId for comparison
    const playerIdTrimmed = playerId.trim();

    // Clean up any potential extra characters from player IDs in the array
    team.players = team.players.map((player) => player.toString().trim());

    // Find the index of the playerId
    const playerIndex = team.players.indexOf(playerIdTrimmed);

    if (playerIndex === -1) {
      return res.status(400).json({ Error: "Player not found on this team" });
    }

    // Remove the player from the team
    team.players.splice(playerIndex, 1); // Remove the player from the array
    const updatedTeam = await team.save(); // Save and get the updated team

    res.status(200).json({
      Success: "Player successfully removed from Team",
      updatedTeam: updatedTeam,
      players: updatedTeam.players, // Return the updated list of players
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({ Error: "Server error removing player from team", error });
  }
});

module.exports = router;
