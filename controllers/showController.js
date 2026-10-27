
import mongoose from "mongoose";
import Show from "../models/Show.model.js";
import Movie from "../models/movie.model.js";
import Theatre from "../models/Theatre.model.js";
import Screen from "../models/Screen.model.js";

export const createShow = async (req, res) => {
  try {
    const {
      movie,
      theatre,
      screen,
      showDate,
      startTime,
      endTime,
      price,
    } = req.body;

    // 1. Check required fields
    if (
      !movie ||
      !theatre ||
      !screen ||
      !showDate ||
      !startTime ||
      !endTime ||
      price === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2. Validate MongoDB IDs
    if (
      !mongoose.isValidObjectId(movie) ||
      !mongoose.isValidObjectId(theatre) ||
      !mongoose.isValidObjectId(screen)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid Movie, Theatre or Screen ID",
      });
    }

    // 3. Validate price
    if (
      typeof price !== "number" ||
      !Number.isFinite(price) ||
      price < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "Price must be a number greater than or equal to 1",
      });
    }

    // 4. Validate dates
    const parsedShowDate = new Date(showDate);
    const parsedStartTime = new Date(startTime);
    const parsedEndTime = new Date(endTime);

    if (
      Number.isNaN(parsedShowDate.getTime()) ||
      Number.isNaN(parsedStartTime.getTime()) ||
      Number.isNaN(parsedEndTime.getTime())
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid date or time format",
      });
    }

    if (parsedEndTime <= parsedStartTime) {
      return res.status(400).json({
        success: false,
        message: "End time must be after start time",
      });
    }

    if (
      parsedShowDate.toISOString().slice(0, 10) !==
      parsedStartTime.toISOString().slice(0, 10)
    ) {
      return res.status(400).json({
        success: false,
        message: "Show date must match the start date",
      });
    }

    // 5. Verify records exist
    const [movieExists, theatreExists, screenExists] =
      await Promise.all([
        Movie.findById(movie),
        Theatre.findById(theatre),
        Screen.findById(screen),
      ]);

    if (!movieExists) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    if (!theatreExists) {
      return res.status(404).json({
        success: false,
        message: "Theatre not found",
      });
    }

    if (!screenExists) {
      return res.status(404).json({
        success: false,
        message: "Screen not found",
      });
    }

    // 6. Verify screen belongs to this theatre
    if (screenExists.theatre.toString() !== theatre) {
      return res.status(400).json({
        success: false,
        message: "Screen does not belong to this theatre",
      });
    }


    // 7. Check for overlapping shows on the same screen
    const overlappingShow = await Show.findOne({
      screen,
      status: "SCHEDULED",
      startTime: { $lt: parsedEndTime },
      endTime: { $gt: parsedStartTime },
    });

    if (overlappingShow) {
      return res.status(409).json({
        success: false,
        message: "This screen already has a show scheduled during this time",
      });
    }

    // 8. Create show
    // 7. Create show
    const show = await Show.create({
      movie,
      theatre,
      screen,
      showDate: parsedShowDate,
      startTime: parsedStartTime,
      endTime: parsedEndTime,
      price,
    });

    return res.status(201).json({
      success: true,
      message: "Show created successfully",
      show,
    });
  } catch (error) {
    console.error("Create Show Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find()
      .populate("movie", "name language")
      .populate("theatre", "name city address")
      .populate("screen", "name totalSeats screenType")
      .sort({ startTime: 1 });

    return res.status(200).json({
      success: true,
      count: shows.length,
      shows,
    });
  } catch (error) {
    console.error("Get All Shows Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const getShowById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Show ID",
      });
    }

    const show = await Show.findById(id)
      .populate("movie", "name language")
      .populate("theatre", "name city address")
      .populate("screen", "name totalSeats screenType");

    if (!show) {
      return res.status(404).json({
        success: false,
        message: "Show not found",
      });
    }

    return res.status(200).json({
      success: true,
      show,
    });
  } catch (error) {
    console.error("Get Show By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
