import express from 'express'
import { addUser ,allUser} from '../controllers/userController.js';
const router=express.Router();

router.get('/user',allUser);
router.post('/user',addUser);

export default router;