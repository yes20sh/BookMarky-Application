import { Request, Response } from 'express';
import Bookmark from '../models/Bookmark';
import { IBookmark } from '../types/bookmark.types';
import { HttpStatus } from '../constants/status';
import { BookmarkMessage } from '../constants/messages';

// GET /api/bookmarks/user?userId=xxx
export const getUserBookmarks = async (req: Request, res: Response) => {
  const { userId } = req.query;

  if (!userId || typeof userId !== 'string') {
    return res.status(HttpStatus.BAD_REQUEST).json({ error: BookmarkMessage.MISSING_USER_ID });
  }

  try {
    const bookmarks = await Bookmark.find({ userId });
    return res.status(HttpStatus.OK).json(bookmarks);
  } catch (err) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: BookmarkMessage.FETCH_FAILED });
  }
};

// POST /api/bookmarks/create
export const createBookmark = async (req: Request, res: Response) => {
  const { userId, title, url } = req.body as IBookmark;

  if (!userId || !title || !url) {
    return res.status(HttpStatus.BAD_REQUEST).json({ error: BookmarkMessage.MISSING_FIELDS });
  }

  try {
    const newBookmark = await Bookmark.create({ userId, title, url });
    return res.status(HttpStatus.CREATED).json(newBookmark);
  } catch (err) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: BookmarkMessage.CREATE_FAILED });
  }
};

// DELETE /api/bookmarks/:id
export const deleteBookmark = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleted = await Bookmark.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(HttpStatus.NOT_FOUND).json({ error: BookmarkMessage.NOT_FOUND });
    }

    return res.status(HttpStatus.OK).json({ message: 'Bookmark deleted' });
  } catch (err) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: BookmarkMessage.DELETE_FAILED });
  }
};
