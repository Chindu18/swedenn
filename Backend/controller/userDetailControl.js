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
    res.json(seats);
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
export const addMovie = async (req, res) => {
  try {
    // Validate uploaded files
    const photoPaths = req.files?.map(file => file.path) || [];

    // Extract individual fields from Postman
    const {
      title = "",
      bookingOpenDays = 3,
      kidsPrice = 0,
      adultsPrice = 0,
      hero = "",
      heroine = "",
      villain = "",
      supportArtists = "",
      director = "",
      producer = "",
      musicDirector = "",
      cinematographer = "",
    } = req.body;

    if (!title) return res.status(400).json({ message: "Movie title is required" });

    // Transform support artists (comma separated string to array)
    const cast = {
      hero,
      heroine,
      villain,
      supportArtists: supportArtists ? supportArtists.split(",").map(s => s.trim()) : [],
    };

    const crew = { director, producer, musicDirector, cinematographer };

    const ticketPrice = {
      kids: Number(kidsPrice),
      adults: Number(adultsPrice),
    };

    // Transform show timings (individual inputs: show1Date, show1Time, show2Date...)
    const showTimings = [];
    Object.keys(req.body)
      .filter(key => key.startsWith("show"))
      .forEach(key => {
        if (key.endsWith("Date")) {
          const idx = key.replace("show", "").replace("Date", "");
          const timeKey = `show${idx}Time`;
          showTimings.push({
            date: new Date(req.body[key]),
            time: req.body[timeKey] || "00:00",
          });
        }
      });

    // Save movie
    const movie = new Movie({
      title,
      cast,
      crew,
      photos: photoPaths,
      showTimings,
      ticketPrice,
      bookingOpenDays: Number(bookingOpenDays),
    });

    await movie.save();
    res.status(201).json({ message: "Movie added successfully", movie });
  } catch (error) {
    console.error("Add movie error:", error);
    res.status(500).json({ message: "Failed to add movie", error: error.message });
  }
};
