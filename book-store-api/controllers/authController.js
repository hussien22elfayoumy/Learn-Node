import bcrypt from 'bcryptjs';
import {
  generateToken,
  User,
  validateLoginUser,
  validateRegisterUser,
} from '../models/User.js';

export const signup = async (req, res) => {
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

    const token = generateToken({ id: result._id, isAdmin: result.isAdmin });

    const { password, ...rest } = result._doc;

    res
      .status(201)
      .json({ message: 'user create successfully', user: { ...rest, token } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
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
};
