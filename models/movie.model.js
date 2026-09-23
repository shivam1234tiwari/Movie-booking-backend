import mongoose from "mongoose";
const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    casts: {
      type: [String],
      required: true,
    },
    trailerUrl: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
      default: "English",
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    releaseStatus: {
      type: String,
      required: true,
      enum: ["UPCOMING", "RELEASED", "ENDED"],

      default: "RELEASED",
    },
  },
  {
    timestamps: true,
  },
);
const Movie = mongoose.model("movie", movieSchema);
export default Movie;
