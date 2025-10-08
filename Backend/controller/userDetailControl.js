import Booking from "../Models/Booking.js";
import multer from "multer";
import Movie from "../Models/Movies.js";


// Add a booking
// Controllers/yourController.js

import { v4 as uuidv4 } from 'uuid'; 

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

    // 👇 generate a bookingId here
    const bookingId = "BKG-" +  uuidv4().split("-")[0];

    // Save booking with bookingId
    const booking = new Booking({
      ...req.body,
      bookingId
    });
    await booking.save();

    res.status(201).json({ 
      message: "Booking saved successfully",
      success: true,
      data:booking,
      bookingId 
    });
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







// ---------------------- Add Movie Controller ----------------------

// Controllers/userDetailControl.js

import path from "path";
import fs from "fs";


// ---------------------- Multer Local Storage ----------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), "uploads/movies");
    // Ensure folder exists
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });

// ---------------------- Add Movie Controller ----------------------
export const addMovie = async (req, res) => {
  try {
    const {
      title,
      hero,
      heroine,
      villain,
      supportArtists,
      director,
      producer,
      musicDirector,
      cinematographer,
      showTimings,
    } = req.body;

    if (!title || !hero || !heroine) {
      return res.status(400).json({ success: false, message: "Title, hero, and heroine are required" });
    }

    // Handle local files
    const files = req.files || [];
    const posterUrls = files.map((file) => `${file.filename}`);

    // Parse show timings safely
    let shows = [];
    try {
      shows = showTimings ? JSON.parse(showTimings) : [];
    } catch (err) {
      shows = [];
    }

    const movie = new Movie({
      title,
      cast: {
        actor: hero,
        actress: heroine,
        villan: villain || "",
        supporting: supportArtists || "",
      },
      crew: {
        director: director || "",
        producer: producer || "",
        musicDirector: musicDirector || "",
        cinematographer: cinematographer || "",
      },
      posters: posterUrls,
      shows,
    });

    const savedMovie = await movie.save();

    res.status(201).json({
      success: true,
      message: "Movie added successfully",
      data: savedMovie,
    });
  } catch (error) {
    console.error("Error in addMovie:", error);
    res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};
