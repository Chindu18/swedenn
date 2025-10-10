// Routes/userRouter.js
import express from "express";
import { addBooking, getBookedSeats,addMovie,upload} from "../controller/userDetailControl.js";
import { getBookingById } from "../controller/dashBoardController.js";

const userRouter = express.Router();

userRouter.post("/addBooking", addBooking);
userRouter.get("/bookedSeats", getBookedSeats);
userRouter.post("/addDetails", upload.array("photos", 3), addMovie);

userRouter.get('/bookingid/:bookingId', getBookingById);

export default userRouter;
