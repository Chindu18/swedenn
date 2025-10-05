import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    cast: {
      hero: { type: String, default: "" },
      heroine: { type: String, default: "" },
      villain: { type: String, default: "" },
      supportArtists: { type: [String], default: [] }, // array of names
    },
    crew: {
      director: { type: String, default: "" },
      producer: { type: String, default: "" },
      musicDirector: { type: String, default: "" },
      cinematographer: { type: String, default: "" },
    },
    photos: { type: [String], default: [] }, // uploaded images
    showTimings: [
      {
        date: { type: Date, default: Date.now },
        time: { type: String, default: "00:00" },
      },
    ],
    ticketPrice: {
      kids: { type: Number, default: 0 },
      adults: { type: Number, default: 0 },
    },
    bookingOpenDays: { type: Number, default: 3 },
  },
  { timestamps: true }
);

export default mongoose.model("Movie", movieSchema);
