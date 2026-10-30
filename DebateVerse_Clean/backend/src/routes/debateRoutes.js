import express from 'express';
import {
  getAllDebates,
  getDebateById,
  createDebate,
  joinDebate,
  submitArgument,
  voteArgument,
  getDebateResults
} from '../controllers/debateController.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllDebates);
router.get('/:id', optionalAuth, getDebateById);
router.post('/', authenticate, createDebate);
router.post('/:id/join', authenticate, joinDebate);
router.post('/:id/arguments', authenticate, submitArgument);
router.post('/:id/votes', authenticate, voteArgument);
router.get('/:id/results', getDebateResults);

export default router;