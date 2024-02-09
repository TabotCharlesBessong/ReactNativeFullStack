const User = require("../models/user");

const requestConnection = async (req, res) => {
  try {
    const { currentUserId, selectedUserId } = req.body;
    await User.findByIdAndUpdate(selectedUserId, {
      $push: { connectionRequests: currentUserId },
    });
    await User.findByIdAndUpdate(currentUserId, {
      $push: { sentConnectionRequests: selectedUserId },
    });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: "Error creating connection request" });
  }
};

const getConnectionRequest = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId)
      .populate("connectionRequests", "name email profileImage")
      .lean();

    const connectionRequests = user.connectionRequests;

    res.json(connectionRequests);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const acceptRequest = async (req, res) => {
  try {
    const { senderId, recepientId } = req.body;
    const sender = await User.findById(senderId);
    const recepient = await User.findById(recepientId);

    sender.connections.push(recepientId);
    recepient.connections.push(senderId);

    recepient.connectionRequests = recepient.connectionRequests.find(
      (request) => request.toString() !== senderId.toString()
    );

    sender.sentConnectionRequests = sender.connectionRequests.find(
      (request) => request.toString() !== recepientId.toString()
    );

    await sender.save();
    await recepient.save();

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserConnections = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId)
      .populate("connections", "name profileImage createdAt")
      .exec();

    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }
    res.status(200).json({ connections: user.connections });
  } catch (error) {
    console.log("error fetching the connections", error);
    res.status(500).json({ message: "Error fetching the connections" });
  }
};

module.exports = {
  requestConnection,
  getConnectionRequest,
  acceptRequest,
  getUserConnections,
};
