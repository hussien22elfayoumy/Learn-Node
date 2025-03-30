import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const getForgorPasswordView = (req, res) => {
  res.render('forgot-password');
};

export const sendForgotPasswordLink = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(user);

    const secret = process.env.JWT_SECRET_KEY + user.password;
    const token = jwt.sign({ email: user.email, id: user._id }, secret, {
      expiresIn: '10m',
    });

    const link = `http://localhost:5000/password/reset-password/${user._id}/${token}`;
    res.status(200).json({ message: 'Click on the link', link });

    // TODO: Send email to the user
  } catch (err) {
    console.log(err);
  }
};
export const getResetPasswordView = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const secret = process.env.JWT_SECRET_KEY + user.password;

    jwt.verify(req.params.userToken, secret);
    res.render('reset-password', {
      email: user.email,
    });
  } catch (err) {
    console.log(err);
    res.json({ message: 'Error' });
  }
};

export const resetPassword = async (req, res) => {
  //TODO: Vlaidateion

  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const secret = process.env.JWT_SECRET_KEY + user.password;
    jwt.verify(req.params.userToken, secret);

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(req.body.password, salt);

    user.password = passwordHash;
    await user.save();

    res.render('success-password');
  } catch (err) {
    console.log(err);
    res.json({ message: 'Error' });
  }
};
