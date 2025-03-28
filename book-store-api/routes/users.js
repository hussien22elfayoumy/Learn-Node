import express from 'express';

import {
  authorizeAdmin,
  authorizeUserAndAdmin,
} from '../middlewares/verifyToken.js';
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '../controllers/usercontroller.js';

const router = express.Router();

router.get('/', authorizeAdmin, getAllUsers);

router.get('/:id', authorizeUserAndAdmin, getUserById);

router.put('/:id', authorizeUserAndAdmin, updateUser);

router.delete('/:id', authorizeUserAndAdmin, deleteUser);

export default router;
