import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { User, validateUpdateUser } from '../models/User.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `Something went wrong ${err.message}` });
  }
});

router.put('/:id', verifyToken, async (req, res) => {
  if (req.userDecoded.id !== req.params.id)
    return res.status(403).json({ message: 'Your are not allowed' }); // 403:: forbidden

  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(req.body.password, salt);

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          email: req.body.email,
          username: req.body.username,
          password: passwordHash,
        },
      },
      {
        new: true,
      }
    ).select('-password');

    console.log(req.userDecoded);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `Something went wrong ${err.message}` });
  }
});

export default router;
