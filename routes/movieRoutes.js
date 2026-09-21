import express from 'express'
import { newMovie } from '../controllers/movieController.js';
const router=express.Router();

router.post('/movie',newMovie);

export default router;