
import Movie from "../models/movie.model.js";

// Add New Movie API
export const newMovie = async (req, res) => {
  try {
    const {
      name,
      description,
      casts,
      trailerUrl,
      language,
      releaseDate,
      director,
      releaseStatus,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !description ||
      !Array.isArray(casts) ||
      casts.length === 0 ||
      !trailerUrl ||
      !language ||
      !releaseDate ||
      !director
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check duplicate movie
    const existMovie = await Movie.findOne({
      name: name.trim(),
    });

    if (existMovie) {
      return res.status(409).json({
        success: false,
        message: "Movie already exists",
      });
    }

    // Create movie
    const addMovie = await Movie.create({
      name: name.trim(),
      description,
      casts,
      trailerUrl,
      language,
      releaseDate,
      director,
      releaseStatus,
    });

    return res.status(201).json({
      success: true,
      message: "Movie Added Successfully",
      movie: addMovie,
    });
  } catch (error) {
    console.log("Add Movie Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get All Movies API
export const getMovie = async (req, res) => {
  try {
    const allmovie = await Movie.find();

    return res.status(200).json({
      success: true,
      message:
        allmovie.length === 0
          ? "No Movies Found"
          : "All Movies Fetched Successfully",
      count: allmovie.length,
      movies: allmovie,
    });
  } catch (error) {
    console.log("Get Movies Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const singleMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Movie Fetched Successfully",
      movie,
    });
  } catch (error) {
    console.log("Get Single Movie Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie Not Found",
      });
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Movie Updated Successfully",
      movie: updatedMovie,
    });
  } catch (error) {
    console.log("Update Movie Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie Not Found",
      });
    }

    const deletedMovie = await Movie.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Movie Deleted Successfully",
      movie: deletedMovie,
    });
  } catch (error) {
    console.log("Delete Movie Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

