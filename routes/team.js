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
router.get("/myTeam/", async (req, res) => {
  try {
    const { userId } = req.body;
    const myTeam = await Team.findOne({ owner: userId });
    if (!myTeam) {
      return res.status(404).json({ Error: "Team not found" });
    }
    //send back team if found
    res.json(myTeam);
  } catch (error) {
    res.status(500).json({ Error: "Server error getting Team", error });
  }
});

module.exports = router;
