import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  timing: { type: String, required: true },
  seatNumbers: { type: [Number], required: true },
  adult: { type: Number, required: true },
  kids: { type: Number, required: true },
  ticketType: { type: String, required: true },
  totalAmount: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model("Booking", BookingSchema);
