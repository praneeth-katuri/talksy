const User = require("../models/User");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "friends",
      "username profilePicture status"
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { username, profilePicture } = req.body;

    const user = User.findByIdAndUpdate(req.user._id, {
      username,
      profilePicture,
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;

    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: i } },
      ],
      _id: { $ne: req.user._id },
    }).select("username email profilePicture status");

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  searchUsers,
};
