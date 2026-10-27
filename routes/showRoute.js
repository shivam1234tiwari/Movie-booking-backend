
import express from "express";
import { createShow ,getAllShows , getShowById} from "../controllers/showController.js";

const router = express.Router();

router.post("/", createShow);
router.get("/",getAllShows);
router.get("/:id",getShowById);

export default router;
