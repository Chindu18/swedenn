import nodemailer from "nodemailer";

let otpStore = {}; // Temporary in-memory store

// ✅ Send OTP
export const sendOTP = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[email] = otp;

  const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.email_name,
    pass: process.env.email_pass,
  },
});


  const mailOptions = {
    from: process.env.email_name,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It will expire in 2 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}: ${otp}`);
    res.json({ success: true, message: "OTP sent successfully!" });

    // Auto-delete OTP after 2 minutes
    setTimeout(() => delete otpStore[email], 120000);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};

// ✅ Verify OTP
export const verifyOTP = (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] && otpStore[email] == otp) {
    delete otpStore[email];
    return res.json({ success:true, message: "OTP verified successfully!" });
  }

  res.json({ success: false, message: "Invalid or expired OTP" });
};
