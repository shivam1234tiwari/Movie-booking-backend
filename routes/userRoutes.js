import express from 'express'
import { addUser ,allUser,SingleUser,login,updateUser,DeleteUser} from '../controllers/userController.js';
import {authMiddleware} from '../middleware/authMiddleware.js'
const router=express.Router();

router.get('/user',allUser);
router.get('/user/:id',SingleUser);
router.get("/profile", authMiddleware, SingleUser);
router.post('/user',addUser);
router.post('/user/login',login)
router.put('/user/:id',updateUser);
router.delete('/user/:id',DeleteUser);

export default router;