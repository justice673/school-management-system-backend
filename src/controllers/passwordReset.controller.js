const jwt = require("jsonwebtoken");
const User = require("../models/User");
const service = require("../services/auth.service");
const sendEmail = require("../../sendEmail");

const passwordReset = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({message: "User not found"});

  // Generate OTP and set expiry (1 hour)
  const otp = service.generateOtp();
  user.otpCode = otp;
  user.otpExpiry = Date.now() + 60 * 60 * 1000;
  await user.save();

  
  sendEmail.sendEmail("marieblondellengoho@gmail.com",otp)

  return res.json({
    message: "OTP has been generated and sent to your email.",
  });
};

const verifyOtp = async (req, res) => {
  const { otp } = req.body;
  const user = await User.findOne({ otpCode: otp, otpExpiry: { $gt: Date.now() } });
  if (!user) return res.status(400).json({ message: "Invalid or expired OTP" });

  // Generate token for password reset link
  const token = jwt.sign({ userId: user._id }, 'secret_key', {
    expiresIn: "1h",
  });

  const link = `http://localhost:3000/resetpassword/${token}`;
  res.json({
    message: "OTP verified successfully. Use the link to reset your password.",
    resetLink: link,
  });
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const savedUser = jwt.verify(token, 'secret_key');
    const user = await User.findById(savedUser.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Hash new password and reset OTP fields
    user.password = await service.hashPassword(newPassword);
    user.otpCode = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({ message: "Password successfully reset" });
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};

module.exports = {
  passwordReset,
  verifyOtp,
  resetPassword,
};
