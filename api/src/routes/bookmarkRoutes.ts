import express from 'express';
import {
  getUserBookmarks,
  createBookmark,
  deleteBookmark,
} from '../controllers/bookmarkController';

const router = express.Router();

router.get('/user', getUserBookmarks);
router.post('/create', createBookmark);
router.delete('/:id', deleteBookmark);

export default router;
