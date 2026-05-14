const express = require("express");
const router = express.Router();

const generateOTP = require("../utils/otp");
const sendOTP = require("../services/email");


const otpStore = {};

// SIGNUP (BUYERS ONLY)
router.post("/signup", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (role !== "buyer") {
      return res.status(400).json({ message: "Only buyers need OTP" });
    }

    const otp = generateOTP();
    otpStore[email] = otp;

    try {
      await sendOTP(email, otp);
console.log("AFTER EMAIL CALL");
    } catch (err) {
      console.log("EMAIL:", email);
      console.log("OTP:", otp);
    }

    res.json({ message: "OTP sent (check email or console)" });

  } catch (error) {
    console.log("SIGNUP ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// VERIFY OTP
router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] === otp) {
    delete otpStore[email];
    return res.json({ message: "Verified successfully" });
  }

  res.status(400).json({ message: "Invalid OTP" });
});

module.exports = router;