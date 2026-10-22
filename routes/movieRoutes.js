import express from 'express'
import { newMovie,getMovie,singleMovie ,updateMovie, deleteMovie} from '../controllers/movieController.js';
const router=express.Router();

router.post('/movie',newMovie);
router.get('/movie',getMovie);
router.get('/movie/:id',singleMovie);
router.put('/movie/:id',updateMovie);
router.delete('/movie/:id',deleteMovie);

export default router;