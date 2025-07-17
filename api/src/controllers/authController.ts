import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { RegisterInput, LoginInput } from '../types/user.types';
import { AuthMessage } from '../constants/messages';
import { HttpStatus } from '../constants/status';

export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body as RegisterInput;

  if (!username || !password) {
    return res.status(HttpStatus.BAD_REQUEST).json({ error: AuthMessage.USERNAME_PASSWORD_REQUIRED });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(HttpStatus.CONFLICT).json({ error: AuthMessage.USERNAME_TAKEN });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });

    return res.status(HttpStatus.CREATED).json({ username: newUser.username, userId: newUser._id });
  } catch (err) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: AuthMessage.REGISTRATION_FAILED });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body as LoginInput;

  if (!username || !password) {
    return res.status(HttpStatus.BAD_REQUEST).json({ error: AuthMessage.USERNAME_PASSWORD_REQUIRED });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ error: AuthMessage.INVALID_CREDENTIALS });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ error: AuthMessage.INVALID_CREDENTIALS });
    }

    return res.status(HttpStatus.OK).json({ username: user.username, userId: user._id });
  } catch (err) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: AuthMessage.LOGIN_FAILED });
  }
};
