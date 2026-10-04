import express from 'express'
import { newMovie,getMovie } from '../controllers/movieController.js';
const router=express.Router();

router.post('/movie',newMovie);
router.get('/movie',getMovie);

export default router;