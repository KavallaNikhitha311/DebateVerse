import express from 'express';
import { analyzeArgument } from '../controllers/aiController.js';

const router = express.Router();

router.post('/analyze', analyzeArgument);

export default router;