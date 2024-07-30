const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

//this is how we tell express to look in the client folder for static content so it can open up the html and load it.
app.use(express.static("../src/client"));

//BODY PARSER- lets us pull data out of req.body- We need this for POST requests because they are sent in the req.body-
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//1) A) Connection- in mongoconnection.js,
require("./connections/mongoconnection");

//bring in model(s)
const User = require("./models/UserModel");
