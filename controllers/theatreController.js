import Theatre from "../models/Theatre.model.js";

export const newTheatre = async (req, res) => {
  try {
    const { name, address, city, state, pincode } = req.body;

    if (!name || !address || !city || !state || !pincode) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existTheatre = await Theatre.findOne({
      name: name.trim(),
      address: address.trim(),
      city: city.trim(),
    });

    if (existTheatre) {
      return res.status(409).json({
        success: false,
        message: "Theatre already exists",
      });
    }

    const addTheatre = await Theatre.create({
      name,
      address,
      city,
      state,
      pincode,
    });

    return res.status(201).json({
      success: true,
      message: "Theatre Added Successfully",
      theatre: addTheatre,
    });
  } catch (error) {
    console.log("Add Theatre Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getTheatres = async (req, res) => {
  try {
    const theatres = await Theatre.find();

    return res.status(200).json({
      success: true,
      count: theatres.length,
      theatres,
    });
  } catch (error) {
    console.log("Get Theatres Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const getTheatreById = async (req, res) => {
  try {
    const { id } = req.params;

    const theatre = await Theatre.findById(id);

    if (!theatre) {
      return res.status(404).json({
        success: false,
        message: "Theatre not found",
      });
    }

    return res.status(200).json({
      success: true,
      theatre,
    });
  } catch (error) {
    console.log("Get Theatre By ID Error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid Theatre ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const updateTheatre = async (req, res) => {
  try {
    const { id } = req.params;

    const theatre = await Theatre.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!theatre) {
      return res.status(404).json({
        success: false,
        message: "Theatre not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Theatre updated successfully",
      theatre,
    });
  } catch (error) {
    console.log("Update Theatre Error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid Theatre ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const deleteTheatre = async (req, res) => {
  try {
    const { id } = req.params;

    const theatre = await Theatre.findByIdAndDelete(id);

    if (!theatre) {
      return res.status(404).json({
        success: false,
        message: "Theatre not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Theatre deleted successfully",
    });
  } catch (error) {
    console.log("Delete Theatre Error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid Theatre ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
