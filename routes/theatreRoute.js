
import express from "express";
import {
  newTheatre,
  getTheatres,
  getTheatreById,
  updateTheatre,
  deleteTheatre
} from "../controllers/theatreController.js";

const router = express.Router();

router.post("/", newTheatre);
router.get("/", getTheatres);
router.get("/:id", getTheatreById);
router.put("/:id", updateTheatre);
router.delete("/:id",deleteTheatre);

export default router;
