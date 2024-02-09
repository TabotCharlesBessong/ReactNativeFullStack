const sendVerificationEmail = require("../helper/mail");
const User = require("../models/user");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateSecretKey } = require("../helper");

const secretKey = generateSecretKey();

const register = async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body;

    // checking if the user registering already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(`User with the email address ${email} already exist!`);
      return res.status(400).json({
        message: `User with the email address ${email} already exist!`,
      });
    }

    // creating a new user
    const newPassword = bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password,
      profileImage,
    });

    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    // save user to the database
    await newUser.save();

    // send the verification email to the registered user
    sendVerificationEmail(newUser.email, newUser.verificationToken);
    res.status(202).json({
      message:
        "Registration successful.Please check your mail for verification",
    });
  } catch (error) {
    console.log("Error registering user", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

const verify = async (req, res) => {
  try {
    const token = req.params.token;

    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    // mark user as verified
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Email verification failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user already exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid user credentials" });
    }

    // check if password is correct
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid user credentials" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
    console.log(error);
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user profile" });
  }
};

const getConnections = async (req, res) => {
  try {
    const loggedInUserId = req.params.userId;

    // fetch the loggedin user connections
    const loggedInUser = await User.findById(loggedInUserId).populate(
      "connections",
      "_id"
    );
    if (!loggedInUser) {
      return res.status(400).json({ message: "User not found" });
    }

    // get the IDs of the connected users
    const connectedUsersIds = loggedInUser.connections.map(
      (connection) => connection._id
    );

    // find the users who are not connected to the loggedin user id
    const users = await User.find({
      _id: { $ne: loggedInUserId, $nin: connectedUsersIds },
    });

    res.status(200).json({ users, connectedUsersIds });
  } catch (error) {
    console.log("Error retrieving users: ", error);
    res.status(500).json({ message: "Error retrieving users" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { userDescription } = req.body;

    await User.findByIdAndUpdate(userId, { userDescription });

    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    console.log("Error updating user Profile", error);
    res.status(500).json({ message: "Error updating user profile" });
  }
};

module.exports = {
  register,
  verify,
  login,
  getUser,
  getConnections,
  updateProfile,
};
