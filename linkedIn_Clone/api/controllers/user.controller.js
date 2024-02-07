const sendVerificationEmail = require("../helper/mail")
const User = require("../models/user")
const crypto = require("crypto")
const bcrypt = require("bcrypt")

const register = async (req,res) => {
  try {
    const {name,email,password,profileImage} = req.body

    // checking if the user registering already exist
    const existingUser = await User.findOne({email})
    if(existingUser){
      console.log(`User with the email address ${email} already exist!`)
      return res
        .status(400)
        .json({
          message: `User with the email address ${email} already exist!`,
        });
    }

    // creating a new user
    const newPassword = bcrypt.hash(password,10)
    const newUser = new User({
      name,
      email,
      password,
      profileImage
    })

    newUser.verificationToken = crypto.randomBytes(20).toString("hex")

    // save user to the database
    await newUser.save()

    // send the verification email to the registered user
    sendVerificationEmail(newUser.email,newUser.verificationToken)
    res.status(202).json({
      message:
        "Registration successful.Please check your mail for verification",
    });
  } catch (error) {
    console.log("Error registering user", error);
    res.status(500).json({ message: "Registration failed" });
  }
}

const verify = async (req,res) => {
  try {
    const token = req.params.token

    const user = await User.findOne({verificationToken:token})
    if(!user){
      return res.status(404).json({message:"Invalid verification token"})
    }

    // mark user as verified
    user.verified = true
    user.verificationToken = undefined
    await user.save()
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({message:"Email verification failed"})
  }
}

module.exports = {register,verify}