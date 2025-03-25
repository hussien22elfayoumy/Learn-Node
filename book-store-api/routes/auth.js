import express from 'express';
import {
  User,
  validateRegisterUser,
  validateLoginUser,
} from '../models/User.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res
        .status(400)
        .json({ message: 'User alreay exist use another email' });
    }

    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
    });

    const result = await newUser.save();
    console.log(result);

    res.status(201).json({ message: 'user create successfully', user: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const newUser = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Welcome to book store', user });
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: err.message });
  }
});

export default router;
