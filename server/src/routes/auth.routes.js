import express from 'express';
import { loginUser, refreshToken, registerUser } from '../controllers/auth.controller.js';
import { verifyRefreshToken } from '../middlewares/authJwt.js';
import { validateLogin, validateRegister } from '../middlewares/validator.js';

const authRoutes = express.Router();

authRoutes.post('/api/v1/user/register', validateRegister, registerUser);
authRoutes.post('/api/v1/user/login', validateLogin, loginUser);
authRoutes.post('/api/v1/user/refresh-token', verifyRefreshToken, refreshToken);
export default authRoutes;