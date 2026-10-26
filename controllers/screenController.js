
import mongoose from "mongoose";
import Screen from "../models/Screen.model.js";
import Theatre from "../models/Theatre.model.js";

export const createScreen = async (req, res) => {
  try {
    const { theatre, name, totalSeats, screenType } = req.body;

    // Required fields
    if (
      !theatre ||
      typeof name !== "string" ||
      !name.trim() ||
      totalSeats === undefined ||
      totalSeats === null
    ) {
      return res.status(400).json({
        success: false,
        message: "Theatre, name and totalSeats are required",
      });
    }

    // Validate Theatre ID
    if (!mongoose.isValidObjectId(theatre)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Theatre ID",
      });
    }

    // Validate seat capacity
    if (
      !Number.isInteger(totalSeats) ||
      totalSeats < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "Total seats must be a positive integer",
      });
    }

    // Check Theatre exists
    const existingTheatre = await Theatre.findById(theatre);

    if (!existingTheatre) {
      return res.status(404).json({
        success: false,
        message: "Theatre not found",
      });
    }

    // Check duplicate screen in the same Theatre
    const existingScreen = await Screen.findOne({
      theatre,
      name: name.trim(),
    });

    if (existingScreen) {
      return res.status(409).json({
        success: false,
        message: "Screen name already exists in this theatre",
      });
    }

    // Create Screen
    const screen = await Screen.create({
      theatre,
      name: name.trim(),
      totalSeats,
      ...(screenType !== undefined && { screenType }),
    });

    return res.status(201).json({
      success: true,
      message: "Screen created successfully",
      screen,
    });
  } catch (error) {
    console.error("Create Screen Error:", error);

    // MongoDB duplicate-key error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Screen name already exists in this theatre",
      });
    }

    // Mongoose schema validation error
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const getAllScreens = async (req, res) => {
  try {
    const screens = await Screen.find()
      .populate("theatre", "name city address");

    return res.status(200).json({
      success: true,
      count: screens.length,
      screens,
    });
  } catch (error) {
    console.error("Get All Screens Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const getScreenById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Screen ID",
      });
    }

    const screen = await Screen.findById(id)
      .populate("theatre", "name city address");

    if (!screen) {
      return res.status(404).json({
        success: false,
        message: "Screen not found",
      });
    }

    return res.status(200).json({
      success: true,
      screen,
    });
  } catch (error) {
    console.error("Get Screen By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const updateScreen = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, totalSeats, screenType, status } = req.body;

    // Validate Screen ID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Screen ID",
      });
    }

    // Screen must exist
    const existingScreen = await Screen.findById(id);

    if (!existingScreen) {
      return res.status(404).json({
        success: false,
        message: "Screen not found",
      });
    }

    // Validate name if provided
    if (
      name !== undefined &&
      (typeof name !== "string" || !name.trim())
    ) {
      return res.status(400).json({
        success: false,
        message: "Screen name must be a non-empty string",
      });
    }

    // Validate seat capacity if provided
    if (
      totalSeats !== undefined &&
      (!Number.isInteger(totalSeats) || totalSeats < 1)
    ) {
      return res.status(400).json({
        success: false,
        message: "Total seats must be a positive integer",
      });
    }

    // Validate enum values
    if (
      screenType !== undefined &&
      !["2D", "3D", "IMAX", "4DX"].includes(screenType)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid screen type",
      });
    }

    if (
      status !== undefined &&
      !["ACTIVE", "INACTIVE"].includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid screen status",
      });
    }

    // Update only allowed fields
    const updates = {};

    if (name !== undefined) updates.name = name.trim();
    if (totalSeats !== undefined) updates.totalSeats = totalSeats;
    if (screenType !== undefined) updates.screenType = screenType;
    if (status !== undefined) updates.status = status;

    const updatedScreen = await Screen.findByIdAndUpdate(
      id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    ).populate("theatre", "name city address");

    return res.status(200).json({
      success: true,
      message: "Screen updated successfully",
      screen: updatedScreen,
    });
  } catch (error) {
    console.error("Update Screen Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Screen name already exists in this theatre",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteScreen = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Screen ID",
      });
    }

    const screen = await Screen.findByIdAndDelete(id);

    if (!screen) {
      return res.status(404).json({
        success: false,
        message: "Screen not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Screen deleted successfully",
    });
  } catch (error) {
    console.error("Delete Screen Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};