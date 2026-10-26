
import express from "express";
import { createShow } from "../controllers/showController.js";

const router = express.Router();

router.post("/", createShow);

export default router;
