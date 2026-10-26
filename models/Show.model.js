import mongoose from "mongoose";

const showSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "movie",
      required: true,
    },
    theatre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "theatre",
      required: true,
    },
    screen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "screen",
      required: true,
    },
    showDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ["SCHEDULED", "CANCELLED", "COMPLETED"],
      default: "SCHEDULED",
    },
  },
  { timestamps: true }
);

const Show = mongoose.model("show", showSchema);

export default Show;