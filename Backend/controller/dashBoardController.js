// controllers/bookingController.js
import Booking from "../Models/Booking.js";

export const getTotalSeats = async (req, res) => {
  try {
    const totalSeats = await Booking.aggregate([
      {
        $group: {
          _id: null,
          totalSeats: { $sum: "$totalSeatsSelected" }
        }
      }
    ]);

    res.json({
      success: true,
      totalSeats: totalSeats[0]?.totalSeats || 0
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
