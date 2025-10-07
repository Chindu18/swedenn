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


export const upload = multer({ storage: multer.memoryStorage() });




// ---------------------- Add Movie Controller ----------------------


// POST /api/addDetails

import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// POST /api/addDetails
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

    const files = req.files || [];
    const posterUrls = [];

    // Upload files to Cloudinary
    for (const file of files) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "movies" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(file.buffer).pipe(stream);
      });

      posterUrls.push(uploadResult.secure_url);
    }

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
      posters: posterUrls, // store Cloudinary URLs
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


