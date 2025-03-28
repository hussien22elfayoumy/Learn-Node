import Joi from 'joi';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', UserSchema);

export function generateToken(data) {
  const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
    expiresIn: '4d',
  });

  return token;
}

export function validateRegisterUser(obj) {
  const schema = Joi.object({
    email: Joi.string().email().min(5).max(100).required(),
    username: Joi.string().min(2).max(200).required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(obj);
}

export function validateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().email().min(5).max(100).required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(obj);
}

export function validateUpdateUser(obj) {
  const schema = Joi.object({
    email: Joi.string().email().min(5).max(100),
    username: Joi.string().min(2).max(200),
    password: Joi.string().min(6),
  });

  return schema.validate(obj);
}
