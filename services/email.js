const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gracekelechi412@gmail.com",
    pass: "nkeazjxzzqkkzcbt",
  },
});

async function sendOTP(email, otp) {
  try{
  await transporter.sendMail({
    from: "AssistMart <gracekelechi412@gmail.com>",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}`,
  });

  
    console.log("Email sent successfully");
  } catch (error) {
    console.log(" EMAIL FAILED:");
    console.log(error);
    throw error;
  }
}

module.exports = sendOTP;

