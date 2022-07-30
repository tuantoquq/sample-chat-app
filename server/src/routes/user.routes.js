import express from 'express';
import { getUserProfile } from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/authJwt.js';

const userRoutes = express.Router();

userRoutes.get('/api/v1/user/auth/profiles', verifyToken, getUserProfile);

export default userRoutes;