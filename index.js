const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

//this is how we tell express to look in the client folder for static content so it can open up the html and load it.
app.use(express.static("../src/client"));

//BODY PARSER- lets us pull data out of req.body- We need this for POST requests because they are sent in the req.body-
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Bring in Connections - need to add connections for other api calls here?
require("./connections/mongoconnection");

//bring in models
const User = require("./models/UserModel");
const Team = require("./models/TeamModel");
const Player = require("./models/PlayerModel");

//Team route handlers
//Add a Get followed teams if we decide to implement following/followers functionality

//Post- Create team route
app.post("/createTeam", async (req, res) => {
  try {
    // Pull out data from body.
    // TODOOwner might be coming from params (const { owner } = req.params)???
    const { teamName } = req.body;
    // Save data to a variable
    const newTeam = new Team({
      teamName,
      //   owner,
    });
    //save to DB- if successful return to client, if not return error
    try {
      const savedTeam = await newTeam.save();
      // Send back the new Team
      res.status(201).json(savedTeam);
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
    res.status(500).json({ error: "Server error deleting team." });
  }
});

//Get team route
app.get("/myTeam", async (req, res) => {
  try {
  } catch (error) {}
});

//Put-Add Update team route
app.put("/addPlayer", async (req, res) => {
  try {
  } catch (error) {}
});

//Put-Remove a player from a team

app.listen(port, () => console.log(`Basic Server on port ${port}`));
