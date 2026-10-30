import { analyzeArgumentWithEngine } from '../services/aiService.js';

export const analyzeArgument = async (req, res, next) => {
  try {
    const { topic, side, content } = req.body;

    if (!topic || !side || !content) {
      return res.status(400).json({
        success: false,
        message: 'Topic, stance (support/oppose), and argument content are required.'
      });
    }

    if (content.trim().length < 15) {
      return res.status(400).json({
        success: false,
        message: 'Argument must be at least 15 characters long for meaningful rhetorical analysis.'
      });
    }

    const analysis = await analyzeArgumentWithEngine({ topic, side, content });

    res.status(200).json({
      success: true,
      analysis
    });
  } catch (error) {
    next(error);
  }
};