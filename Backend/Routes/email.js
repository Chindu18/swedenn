import express from "express";
import { confirmMail,holdingConfirm } from "../controller/otpController.js";

const emailRouter = express.Router();

emailRouter.post("/send-qr-email", holdingConfirm);
emailRouter.post("/paid",confirmMail );

export default emailRouter;
