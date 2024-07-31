const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;

/*
  UserSchema defines the structure of the documents in the usesrs collection. Users is the ame of the collection in the database
  UserModel is a Mongoose model created based on the UserSchema. It represents the users collection in MongoDB and provides methods for interacting with it.
*/
