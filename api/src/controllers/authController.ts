import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { RegisterInput, LoginInput } from '../types/user.types';
import { AuthMessage } from '../constants/messages';
import { HttpStatus } from '../constants/status';

export const registerUser = async (req: Request, res: Response) => {
  const { username, password, email } = req.body as RegisterInput;

  if (!username || !password || !email) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      error: 'Username, password, and email are required.',
    });
  }

  try {
    // Check if username or email already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      const conflictField = existingUser.username === username ? 'username' : 'email';
      return res.status(HttpStatus.CONFLICT).json({
        error: `${conflictField} is already in use.`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(HttpStatus.CREATED).json({
      username: newUser.username,
      userId: newUser._id,
    });
  } catch (err: any) {
    console.error('Registration failed:', err);

    if (err.name === 'ValidationError') {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: 'Validation failed',
        details: err.errors,
      });
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: AuthMessage.REGISTRATION_FAILED,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body as LoginInput;

  if (!username || !password) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ error: AuthMessage.USERNAME_PASSWORD_REQUIRED });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ error: AuthMessage.INVALID_CREDENTIALS });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ error: AuthMessage.INVALID_CREDENTIALS });
    }

    return res.status(HttpStatus.OK).json({
      username: user.username,
      userId: user._id,
    });
  } catch (err) {
    console.error('Login failed:', err);

    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: AuthMessage.LOGIN_FAILED });
  }
};
