import express from 'express';
import { getLeaderboard, getDashboardAnalytics } from '../controllers/analyticsController.js';

const router = express.Router();

router.get('/leaderboard', getLeaderboard);
router.get('/dashboard', getDashboardAnalytics);

export default router;
