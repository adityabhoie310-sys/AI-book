import express from 'express';
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  createChapter,
  updateChapter,
  deleteChapter,
} from '../controllers/bookController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/').get(getBooks).post(createBook);
router.route('/:id').get(getBookById).put(updateBook).delete(deleteBook);

router.post('/:bookId/chapters', createChapter);
router.put('/chapters/:chapterId', updateChapter);
router.delete('/chapters/:chapterId', deleteChapter);

export default router;
