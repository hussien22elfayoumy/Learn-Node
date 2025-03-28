import express from 'express';
import {
  User,
  validateRegisterUser,
  validateLoginUser,
  generateToken,
} from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: passwordHash,
    });

    const result = await newUser.save();

    // const token = jwt.sign(
    //   { id: result._id, isAdmin: result.isAdmin },
    //   process.env.JWT_SECRET_KEY,
    //   {
    //     expiresIn: '4d',
    //   }
    // );

    const token = generateToken({ id: result._id, isAdmin: result.isAdmin });

    const { password, ...rest } = result._doc;

    res
      .status(201)
      .json({ message: 'user create successfully', user: { ...rest, token } });
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

  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = generateToken({ id: user._id, isAdmin: user.isAdmin });

    const { password, ...rest } = user._doc;

    res
      .status(200)
      .json({ message: 'Welcome to book store', user: { ...rest, token } });
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: err.message });
  }
});

export default router;
