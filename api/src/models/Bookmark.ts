import { Schema, model, Document, Types } from 'mongoose';
import { IBookmark } from '../types/bookmark.types';

export interface IBookmarkDocument extends IBookmark, Document {}

const bookmarkSchema = new Schema<IBookmarkDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Bookmark = model<IBookmarkDocument>('Bookmark', bookmarkSchema);

export default Bookmark;
