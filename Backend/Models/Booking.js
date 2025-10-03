import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  timing: { type: String, required: true },
  seatNumbers: { type: [Number], required: true },
  adult: { type: Number, required: true },
  kids: { type: Number, required: true },
  ticketType: { type: String, required: true },
  totalAmount: { type: Number, required: true },
}, { timestamps: true });

const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;
