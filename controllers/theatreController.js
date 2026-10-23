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