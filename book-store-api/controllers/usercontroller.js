import bcrypt from 'bcryptjs';

import { User, validateUpdateUser } from '../models/User.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');

    res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `Something went wrong ${err.message}` });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'user not found' });

    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `Something went wrong ${err.message}` });
  }
};

export const updateUser = async (req, res) => {
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

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `Something went wrong ${err.message}` });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'user not found' });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `Something went wrong ${err.message}` });
  }
};
