import express from "express";
import { sendOTP, verifyOTP } from "../controller/otpController.js";

const otprouter = express.Router();

otprouter.post("/send-otp", sendOTP);
otprouter.post("/verify-otp", verifyOTP);

export default otprouter;
