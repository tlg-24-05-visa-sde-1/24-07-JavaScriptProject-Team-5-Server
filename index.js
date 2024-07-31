const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 3000;

//Bring in Connections - need to add connections for other api calls here?
require("./connections/mongoconnection");

//Bring in routes
const usersRoutes = require("./routes/user");
const teamRoutes = require("./routes/team");
const playerRoutes = require("./routes/player");

//this is how we tell express to look in the client folder for static content so it can open up the html and load it.
app.use(express.static("../src/client"));

//BODY PARSER- lets us pull data out of req.body- We need this for POST requests because they are sent in the req.body-
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/users", usersRoutes);
app.use("/teams", teamRoutes);
app.use("/players", playerRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
