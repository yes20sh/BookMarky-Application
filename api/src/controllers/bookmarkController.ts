import { Request, Response } from 'express';
import Bookmark from '../models/Bookmark';
import { IBookmark } from '../types/bookmark.types';

// GET /api/bookmarks/user?userId=xxx
export const getUserBookmarks = async (req: Request, res: Response) => {
  const { userId } = req.query;

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid userId' });
  }

  try {
    const bookmarks = await Bookmark.find({ userId });
    return res.status(200).json(bookmarks);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch bookmarks' });
  }
};

// POST /api/bookmarks/create
export const createBookmark = async (req: Request, res: Response) => {
  const { userId, title, url } = req.body as IBookmark;

  if (!userId || !title || !url) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newBookmark = await Bookmark.create({ userId, title, url });
    return res.status(201).json(newBookmark);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create bookmark' });
  }
};

// DELETE /api/bookmarks/:id
export const deleteBookmark = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleted = await Bookmark.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }

    return res.status(200).json({ message: 'Bookmark deleted' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete bookmark' });
  }
};
