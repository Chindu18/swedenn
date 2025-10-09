import express from "express";
import { confirmMail,holdingConfirm } from "../controller/otpController.js";

const emailRouter = express.Router();

emailRouter.post("/pending", holdingConfirm);
emailRouter.post("/paid",confirmMail );

export default emailRouter;
