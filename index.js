const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");

//this is how we tell express to look in the client folder for static content so it can open up the html and load it.
app.use(express.static("../src/client"));

//BODY PARSER- lets us pull data out of req.body- We need this for POST requests because they are sent in the req.body-
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Bring in Connections - need to add connections for other api calls here?
require("./connections/mongoconnection");

//bring in models
const Team = require("./models/TeamModel");
const Player = require("./models/PlayerModel");

//Team route handlers
//Add a Get followed teams if we decide to implement following/followers functionality

//Post- Create team route
app.post("/createTeam/:owner", async (req, res) => {
  try {
    // Pull out data from body.
    // TODOOwner might be coming from params
    const { owner } = req.params;
    const { teamName } = req.body;
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

//TODO- change to look for team based on owner?
app.delete("/deleteTeam/:teamId", async (req, res) => {
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
    res.status(500).json({ Error: "Server error deleting team", error });
  }
});

//Get team route
app.get("/myTeam/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
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

// Put - add player to team route handler
app.put("/addPlayer/:userId", async (req, res) => {
  try {
    const { userId } = req.params; // User ID from the route params
    const { playerId } = req.body; // Player ID from the body

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

app.delete("/removePlayer/:userId", async (req, res) => {
  try {
    const { userId } = req.params; // User ID from the route params
    const { playerId } = req.body; // Player ID from the body

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

    const player = team.players.find((player) => player === playerId);
    if (!player) {
      return res.status(400).json({ error: "Player not found in this team" });
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

// Get All Players Route Handler

app.get("/allPlayers", async (req, res) => {
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

app.listen(port, () => console.log(`Server running on port ${port}`));
