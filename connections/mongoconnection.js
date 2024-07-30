//require dotenv at top
require("dotenv").config();

//Connection
const mongoose = require("mongoose");

//make our variables from .env file to build our endpoint
const { URI, DB_PASS, DB_USER } = process.env;

//build our endpoint

const endpoint = `${URI}`;

let connectionObject = {
  authSource: "admin",
  user: DB_USER,
  pass: DB_PASS,
};

//now we connect to our DB and it's a good idea to console log if it was successful with .then and if there was an error with .catch;  The endpoint with variable DB creates the DB being the name of the DB, so use the DB if it exists and if not create it.
mongoose
  .connect(endpoint, connectionObject)
  .then(() => {
    console.log(`Connected to  database`);
  })
  .catch((err) => {
    console.log(`Error coming from database`, err);
  });
