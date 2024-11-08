const FriendRequest = require("../models/FriendRequest");
const User = require("../models/User");

const sendRequest = async (req, res) => {
  try {
    const { to } = req.body;
    const from = req.user._id;

    const [sender, receiver] = await Promise.all([
      User.findById(from),
      User.findById(to),
    ]);

    if (!sender || !receiver)
      return res.status(404).json({ message: "User not found" });

    if (sender.friends.includes(to))
      return res.status(400).json({ message: "Already Friends" });

    const existingRequest = await FriendRequest.findOne({
      $or: [
        { from, to },
        { from: to, to: from },
      ],
    });

    if (existingRequest)
      return res.status(400).json({ message: "Requst already exists" });

    const request = await FriendRequest.create({ from, to });

    await User.findByIdAndUpdate(to, {
      $addToSet: { friendRequests: from },
    });

    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
