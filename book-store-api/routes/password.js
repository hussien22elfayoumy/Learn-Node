import express from 'express';
import {
  getForgorPasswordView,
  getResetPasswordView,
  resetPassword,
  sendForgotPasswordLink,
} from '../controllers/passwordController.js';

const router = express.Router();

router.get('/forgot-password', getForgorPasswordView);

router.post('/forgot-password', sendForgotPasswordLink);

router.get('/reset-password/:userId/:userToken', getResetPasswordView);

router.post('/reset-password/:userId/:userToken', resetPassword);

export default router;
