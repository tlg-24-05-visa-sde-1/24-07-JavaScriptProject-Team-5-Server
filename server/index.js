const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User");

const app = express();
app.use(express.json());
app.use(cors());

// mongoose.connect(
//   "mongodb+srv://Amir:bUGYkLhtCustyFRS@cluster0.ryxdk3u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// );

mongoose
  .connect(
    "mongodb+srv://Amir:bUGYkLhtCustyFRS@cluster0.ryxdk3u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log(`Connected to database`);
  })
  .catch((err) => {
    console.log(`Error coming from database`, err);
  });
// the above establishes database connection

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  //The above gets the user name and password from the request from the front end
  UserModel.findOne({ email: email }).then((user) => {
    //user represents the results of the query
    // Uses the findOne method to look in the database for a matching email
    if (user) {
      //checks if there is a user that fits the match
      if (user.password === password) {
        //checks if the user user password in the database mataches user input from the login form
        res.json("Sucessfully Logged in");
        //the frontend checks for this reponse and if the reponse mathces sends the user to the home page
      } else {
        res.json("The password is incorrect");
      }
    } else {
      res.json("User not found");
    }
  });
});

app.post("/register", (req, res) => {
  UserModel.create(req.body)
    /* req.body contains the form information that was submitted including username, email, and password.
    UserModel is a Mongoose model created based on the UserSchema. It represents the users collection in MongoDB and provides methods for interacting with it.
    it uses the method .create create and save a new user inside the database
    */

    .then((users) => res.json(users))

    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is working");
});

// bUGYkLhtCustyFRS
