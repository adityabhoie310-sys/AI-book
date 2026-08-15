import express from 'express';
import {
  generateOutline,
  generateChapter,
  assistantAction,
} from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/generate-outline', generateOutline);
router.post('/generate-chapter', generateChapter);
router.post('/assistant-action', assistantAction);

export default router;
