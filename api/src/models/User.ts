import { Schema, model, Document } from 'mongoose';
import type { IUser } from '../types/user.types';

// Remove _id from IUser if it's defined there — Document already includes _id
export interface IUserDocument extends Omit<IUser, '_id'>, Document {}

const userSchema = new Schema<IUserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = model<IUserDocument>('User', userSchema);

export default User;
