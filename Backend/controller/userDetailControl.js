import Booking from "../Models/Booking.js";
import multer from "multer";
import Movie from "../Models/Movies.js";


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
    res.json({success:true,
      message:"fetchehed seat successfully",
      data:seats
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};






// ---------------------- Multer Storage ----------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/movies"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
});

export const upload = multer({ storage });

// ---------------------- Add Movie Controller ----------------------


// POST /api/addDetails
export const addMovie = async (req, res) => {
  try {
    const { title, hero, heroine, villain, supportArtists, director, producer, musicDirector, cinematographer, showTimings } = req.body;

    // Multer will give files in req.files
    const posters = req.files?.map(file => file.filename) || [];

    // Parse showTimings JSON from frontend
    const shows = showTimings ? JSON.parse(showTimings) : [];

    const movie = new Movie({
      title,
      cast: {
        actor: hero,
        actress: heroine,
        villan: villain,
        supporting: supportArtists,
      },
      crew: {
        director,
        producer,
        musicDirector,
        cinematographer,
      },
      posters,
      shows,
    });

    const savedMovie = await movie.save();

    res.status(201).json({
      success: true,
      message: "Movie added successfully",
      data: savedMovie,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: `Error occurred: ${error.message}`,
    });
  }
};

