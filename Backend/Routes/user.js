import express from "express";
import { addBooking, getBookedSeats } from "../controller/userDetailControl.js";

const userRouter = express.Router();

// Add booking
userRouter.post("/addBooking", addBooking);

// Get booked seats
userRouter.get("/bookedSeats", getBookedSeats);

export default userRouter;
