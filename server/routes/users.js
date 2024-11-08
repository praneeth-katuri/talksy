const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.join(user);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/me", auth, async (req, res) => {
  try {
    const { username, profilePicture } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, {
      username,
      profilePicture,
    });
    res.join(user);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});
