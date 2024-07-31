const express = require("express");
const Team = require("../models/TeamModel");
const router = express.Router();

//Team route handlers
//Add a Get followed teams if we decide to implement following/followers functionality

//Post- Create team route
router.post("/createTeam", async (req, res) => {
  try {
    // Pull out data from body.
    // TODOOwner might be coming from params
    // const { owner } = req.params;
    const { teamName, owner } = req.body;
    // Save data to a variable
    const newTeam = new Team({
      teamName,
      owner,
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
router.delete("/deleteTeam/:teamId", async (req, res) => {
  try {
    //teamId send over in params- pull it out
    const { teamId } = req.params;
    //tell DB to delete it
    const result = await Team.deleteOne({ _id: teamId });
    //handle case of there being no team
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Team not found in database" });
    }
    //send deletedTeam to client
    res.json("Team successfully deleted", result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error deleting team." });
  }
});

//Get team route
router.get("/myTeam/:teamId", async (req, res) => {
  try {
    const { teamId } = req.params;
    const myTeam = await Team.find({ _id: teamId });
    if (!myTeam) {
      return res.status(404).json({ Error: "Team not found" });
    }
    //send back team if found
    res.json(myTeam);
  } catch (error) {
    res.status(500).json({ Error: "Server error getting Team", error });
  }
});

//Put-Add Update team route
router.put("/addPlayer/:teamId", async (req, res) => {
  try {
    //have teamId coming through params?  or maybe userId?
    //playerInfo sent through body.
    const { teamId } = req.params;
    const { playerName, position } = req.body;
    //create and save new player in Player collection
    const newPlayer = new Player({ playerName, position });
    await newPlayer.save();

    // Update the team to include the new player's _id
    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      { $push: { players: newPlayer._id } },
      { new: true } // Return the updated document, the default is false and this returns the old document before the update
    );
    if (!updatedTeam) {
      return res.status(404).json({ Error: "Team not found" });
    }
    res
      .status(200)
      .json({ Success: "Player successfully added to Team", updatedTeam });
  } catch (error) {
    res.status(500).json({ Error: "Server error adding player to team" });
  }
});

//Put-Remove a player from a team
router.put("/removePlayer/:teamId", async (req, res) => {
  try {
    const { teamId } = req.params;
    const { playerId } = req.body;

    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      { $pull: { players: playerId } },
      { new: true }
    );
    if (!updatedTeam) {
      return res.status(404).json({ Error: "Team not found" });
    }
    res
      .status(200)
      .json({ Success: "Player successfully removed from Team", updatedTeam });
  } catch (error) {
    res.status(500).json({ Error: "Server error removing player from team" });
  }
});

module.exports = router;
