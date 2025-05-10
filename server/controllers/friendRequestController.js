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

const getRequests = async (req, res) => {
  try {
    const requests = await FriendRequest.find({
      to: req.user._id,
      status: "pending",
    }).populate("from", "username profilePicture");

    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const respondToRequest = async (req, res) => {
  try {
    const { reqestId } = req.params;
    const { status } = req.body;

    const request = await FriendRequest.findById(reqestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.to.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    request.status = status;

    await request.save();

    if (status === "accepted") {
      await Promise.all([
        User.findByIdAndUpdate(request.from, {
          $addToSet: { friends: request.to },
        }),
        User.findByIdAndUpdate(request.to, {
          $addToSet: { frineds: request.from },
          $pull: { friendRequests: request.from },
        }),
      ]);
    } else {
      await User.findByIdAndUpdate(request.to, {
        $pull: { friendRequests: request.from },
      });
    }

    res.json({ message: `Request ${status}` });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  sendRequest,
  getRequests,
  respondToRequest,
};
