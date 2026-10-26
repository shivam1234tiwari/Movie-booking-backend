
import express from "express";
import { createScreen , getAllScreens , getScreenById , updateScreen , deleteScreen} from "../controllers/screenController.js";

const router = express.Router();

router.post("/", createScreen);
router.get("/",getAllScreens);
router.get("/:id",getScreenById);
router.put("/:id",updateScreen);
router.delete("/:id",deleteScreen);
export default router;
