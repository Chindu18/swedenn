// controllers/bookingController.js
import Booking from "../Models/Booking.js";
import Movies from "../Models/Movies.js";
export const getTotalSeats = async (req, res) => {
  try {
    const { movieName } = req.query; // get movieName from query params

    const matchStage = movieName ? { movieName } : {}; // filter only if movieName provided

    const totalSeats = await Booking.aggregate([
      { $match: matchStage },
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




export const pendingMoney = async (req, res) => {
  try {
    const { paymentStatus,movieName} = req.query;
    if (!paymentStatus&&!movieName) {
      return res.status(400).json({
        success: false,
        message: "paymentStatus query parameter is required",
      });
    }

    // 1️⃣ Get all bookings with the requested payment status
    const bookings = await Booking.find({ movieName,paymentStatus, });

    // 2️⃣ Calculate total amount
    const totalAmount = bookings.reduce((sum, b) => sum + b.totalAmount, 0);

    res.json({
      success: true,
      message: "Pending payment bookings fetched successfully",
      data: bookings,
      totalAmount, // ✅ total sum of totalAmount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching pending bookings",
    });
  }
};







// Update payment status by bookingId
export const updatePaymentStatus = async (req, res) => {
  try {
    const { bookingId } = req.params; // from URL
    const { paymentStatus } = req.body; // from request body

    if (!paymentStatus || !['pending', 'paid', 'failed'].includes(paymentStatus.toLowerCase())) {
      return res.status(400).json({ success: false, message: "Invalid paymentStatus" });
    }

    const booking = await Booking.findOneAndUpdate(
      { bookingId },
      { paymentStatus: paymentStatus.toLowerCase() },
      { new: true } // return updated document
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.json({
      success: true,
      message: `Payment status updated to ${paymentStatus}`,
      data: booking
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};






///total shows with movie name filter



export const getTotalShows = async (req, res) => {
  try {
    const { movieName } = req.query; //
    if (!movieName) {
      return res.status(400).json({ success: false, message: "movieName is required" });
    }

    // Find movie by name
    const movie = await Movies.findOne({ title: movieName });

    if (!movie) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }

    // Count total shows
    const totalShows = movie.shows?.length || 0;

    res.json({
      success: true,
      movieName: movie.title,
      totalShows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};






///id



// ✅ Get booking details by bookingId
export const getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "bookingId parameter is required",
      });
    }

    const booking = await Booking.findOne({ bookingId });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      message: "Booking fetched successfully",
      data: booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
