import express from 'express'
import { addUser ,allUser,SingleUser} from '../controllers/userController.js';
const router=express.Router();

router.get('/user',allUser);
router.get('/user/:id',SingleUser);
router.post('/user',addUser);

export default router;