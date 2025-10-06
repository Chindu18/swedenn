import mongoose from "mongoose";

const showPricesSchema = new mongoose.Schema({
  adult: { type: Number, default: 0 },
  kids: { type: Number, default: 0 },
});

const showSchema = new mongoose.Schema({
  date: { type: String, required: true }, // store as string from frontend
  time: { type: String, required: true },
  prices: {
    online: { type: showPricesSchema, default: {},required: true },
    videoSpeed: { type: showPricesSchema, default: {},required: true },
    soder: { type: showPricesSchema, default: {},required: true },
  },
});

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    cast: {
      actor: { type: String, default: "" },
      actress: { type: String, default: "" },
      villan: { type: String, default: "" },
      supporting: { type: String, default: "" },
    },
    crew: {
      director: { type: String, default: "" },
      producer: { type: String, default: "" },
      musicDirector: { type: String, default: "" },
      cinematographer: { type: String, default: "" },
    },
    posters: { type: [String],required: true }, // uploaded images URLs
    shows: { type: [showSchema],required: true}, // store array of shows
  },
  { timestamps: true }
);

export default mongoose.model("Movie", movieSchema);
