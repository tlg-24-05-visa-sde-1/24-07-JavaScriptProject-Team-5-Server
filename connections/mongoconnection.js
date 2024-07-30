//require dotenv at top
require("dotenv").config();

//Connection
const mongoose = require("mongoose");

//make our variables from .env file to build our endpoint
const { URI } = process.env;

const endpoint = `${URI}`;

//We connect to our DB, console log if it was successful with .then and if there was an error with .catch;
mongoose
  .connect(endpoint)
  .then(() => {
    console.log(`Connected to database`);
  })
  .catch((err) => {
    console.log(`Error coming from database`, err);
  });
