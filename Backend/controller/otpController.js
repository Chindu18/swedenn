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



//booking confirmation mail

export const confirmMail=async(req,res)=>{

  
  const { email } = req.body;
 

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
  subject: "Your Movie Confirmation",
  html: `
    <div style="font-family: Arial, sans-serif; background-color: #1c1c1c; color: #fff; padding: 20px;">
      <h2 style="color: #e50914;">🎬 Movie Ticket Confirmation</h2>
      <p>Hi,</p>
      <p>Your payment was successful and your movie ticket has been booked!</p>

      <div style="background-color: #2c2c2c; border-radius: 10px; padding: 15px; margin-top: 20px; text-align: center;">
        <h3 style="color: #e50914;">Your Ticket</h3>
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Ticket12345" alt="QR Code" style="margin: 15px 0;" />
        <p><strong>Movie:</strong> Avengers: Endgame</p>
        <p><strong>Date:</strong> 12 Oct 2025</p>
        <p><strong>Time:</strong> 7:30 PM</p>
        <p><strong>Seat:</strong> D12</p>
        <p><strong>Booking ID:</strong> #Ticket12345</p>
      </div>

      <p>Show this QR code at the theater entrance.</p>
    </div>
  `,
};


  try {
    await transporter.sendMail(mailOptions);
    
    res.json({ success: true, message: "movie booking confirmation mail sended!" });

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to send email for confirmation" });
  }
}

export const holdingConfirm=async(req,res)=>{
  
}