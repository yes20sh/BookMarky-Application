import { Types } from 'mongoose';

export interface IBookmark {
  userId: string | Types.ObjectId; // Allow both
  title: string;
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
}
