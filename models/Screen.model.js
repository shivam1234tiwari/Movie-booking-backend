
import mongoose from "mongoose";

const screenSchema = new mongoose.Schema(
  {
    theatre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "theatre",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    totalSeats: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isInteger,
        message: "Total seats must be a positive integer",
      },
    },

    screenType: {
      type: String,
      enum: ["2D", "3D", "IMAX", "4DX"],
      default: "2D",
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

// Same theatre cannot have duplicate screen names
screenSchema.index(
  { theatre: 1, name: 1 },
  { unique: true }
);

const Screen = mongoose.model("screen", screenSchema);

export default Screen;
