
import express from "express";
import { createShow ,getAllShows , getShowById,updateShow,cancelShow} from "../controllers/showController.js";

const router = express.Router();

router.post("/", createShow);
router.get("/",getAllShows);
router.get("/:id",getShowById);
router.patch("/:id", updateShow);
router.patch("/:id/cancel", cancelShow);

export default router;
