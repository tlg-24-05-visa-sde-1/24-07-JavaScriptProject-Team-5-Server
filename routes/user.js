const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json({ success: true, userId: user._id, message: "Sucessfully Logged in" });
      } else {
        res.json({ success: false, message: "The password is incorrect" });
      }
    } else {
      res.json({ success: false, message: "User not found" });
    }
  });
});

router.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => {
      console.error("Error during user registration:", err);
      res.status(500).json({ error: "Server error during registration", details: err.message });
    });
});

module.exports = router;
