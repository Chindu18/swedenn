import Booking from "../Models/Booking.js";

// Add a booking
export const addBooking = async (req, res) => {
  try {
    const { date, timing, seatNumbers } = req.body;

    // Check if seats are already booked
    const existingBookings = await Booking.find({ date, timing });
    const bookedSeats = existingBookings.flatMap(b => b.seatNumbers);

    const overlap = seatNumbers.some(seat => bookedSeats.includes(seat));
    if (overlap) {
      return res.status(400).json({ message: "Some seats are already booked", success: false });
    }

    // Save booking
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: "Booking saved successfully", success: true });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

// Get booked seats for a date & timing
export const getBookedSeats = async (req, res) => {
  const { date, timing } = req.query;
  try {
    const bookings = await Booking.find({ date, timing });
    const seats = bookings.flatMap(b => b.seatNumbers);
    res.json(seats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
