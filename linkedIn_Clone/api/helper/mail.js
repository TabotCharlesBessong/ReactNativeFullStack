const nodemailer = require("nodemailer");

const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
      user:"ebezebeatrice@gmail.com",
      pass:"Hello#123"
    }
  })

  const mailOPtions = {
    from:"charlesbessongtabot@gmail.com",
    to:email,
    subject:"Email Verification",
    text:"Please check your email for the verification link"
  }

  // send the mail
  try {
    await transporter.sendMail(mailOPtions)
    console.log("Verification email sent successfully")
  } catch (error) {
    console.log("Error sending the verification mail: ",error)
  }
};

module.exports = sendVerificationEmail
