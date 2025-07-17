import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { RegisterInput, LoginInput } from '../types/user.types';

// POST /api/auth/register
export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body as RegisterInput;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, password: hashedPassword });

    return res.status(201).json({ username: newUser.username, userId: newUser._id });
  } catch (err) {
    return res.status(500).json({ error: 'Registration failed' });
  }
};

// (loginUser already exists)
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body as LoginInput;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    return res.status(200).json({ username: user.username, userId: user._id });
  } catch (err) {
    return res.status(500).json({ error: 'Login failed' });
  }
};


