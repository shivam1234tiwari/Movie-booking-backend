import express from "express";

import { newTheatre , getTheatres} from "../controllers/theatreController.js";

const router = express.Router();

// Add New Theatre
router.post("/", newTheatre);
router.get("/", getTheatres);

export default router;