import mongoose from 'mongoose';
import { Debate } from '../models/Debate.js';
import { Argument } from '../models/Argument.js';
import { Vote } from '../models/Vote.js';
import { Result } from '../models/Result.js';
import { Student } from '../models/Student.js';

// Helper to auto-complete expired debates
const autoCheckDeadline = async (debate) => {
  if (debate.status === 'active' && new Date(debate.deadline) <= new Date()) {
    debate.status = 'completed';
    await debate.save();
    await calculateAndStoreResult(debate._id);
  }
};

export const calculateAndStoreResult = async (debateId) => {
  const supportVotesCount = await Argument.aggregate([
    { $match: { debateId: new mongoose.Types.ObjectId(debateId), side: 'support' } },
    { $group: { _id: null, total: { $sum: '$votesCount' } } }
  ]);

  const opposeVotesCount = await Argument.aggregate([
    { $match: { debateId: new mongoose.Types.ObjectId(debateId), side: 'oppose' } },
    { $group: { _id: null, total: { $sum: '$votesCount' } } }
  ]);

  const support = supportVotesCount[0]?.total || 0;
  const oppose = opposeVotesCount[0]?.total || 0;

  let winner = 'tie';
  if (support > oppose) winner = 'support';
  else if (oppose > support) winner = 'oppose';

  return await Result.findOneAndUpdate(
    { debateId },
    { supportVotes: support, opposeVotes: oppose, winner, completedAt: new Date() },
    { upsert: true, new: true }
  );
};

export const getAllDebates = async (req, res, next) => {
  try {
    const { search, category, status, sortBy } = req.query;
    const filter = {};

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { statement: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (status && status !== 'all') {
      filter.status = status;
    }

    let sortOptions = { createdAt: -1 };
    if (sortBy === 'deadline') sortOptions = { deadline: 1 };
    if (sortBy === 'popular') sortOptions = { 'participants.length': -1, createdAt: -1 };

    const debates = await Debate.find(filter)
      .populate('createdBy', 'name college')
      .sort(sortOptions);

    // Check deadlines
    const now = new Date();
    for (const d of debates) {
      if (d.status === 'active' && new Date(d.deadline) <= now) {
        d.status = 'completed';
        await d.save();
      }
    }

    res.status(200).json({ success: true, count: debates.length, debates });
  } catch (error) {
    next(error);
  }
};

export const getDebateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid debate ID format.' });
    }

    const debate = await Debate.findById(id).populate('createdBy', 'name college');
    if (!debate) {
      return res.status(404).json({ success: false, message: 'Debate not found.' });
    }

    await autoCheckDeadline(debate);

    const argumentsList = await Argument.find({ debateId: debate._id })
      .populate('studentId', 'name college totalPoints')
      .sort({ votesCount: -1, createdAt: -1 });

    let userParticipation = null;
    let hasVoted = false;

    if (req.user) {
      const p = debate.participants.find(part => part.studentId.toString() === req.user._id.toString());
      if (p) userParticipation = p.side;

      const userVote = await Vote.findOne({ debateId: debate._id, voterId: req.user._id });
      if (userVote) hasVoted = true;
    }

    let result = null;
    if (debate.status === 'completed') {
      result = await Result.findOne({ debateId: debate._id });
      if (!result) {
        result = await calculateAndStoreResult(debate._id);
      }
    }

    res.status(200).json({
      success: true,
      debate,
      arguments: argumentsList,
      userParticipation,
      hasVoted,
      result
    });
  } catch (error) {
    next(error);
  }
};

export const createDebate = async (req, res, next) => {
  try {
    const { title, description, statement, category, durationMinutes, deadline } = req.body;

    if (!title || !description || !statement || !category) {
      return res.status(400).json({ success: false, message: 'Please provide title, description, statement, and category.' });
    }

    let debateDeadline;
    if (deadline) {
      debateDeadline = new Date(deadline);
    } else if (durationMinutes) {
      debateDeadline = new Date(Date.now() + parseInt(durationMinutes, 10) * 60 * 1000);
    } else {
      // Default to 15 minutes for college timed debate rounds
      debateDeadline = new Date(Date.now() + 15 * 60 * 1000);
    }

    if (debateDeadline <= new Date()) {
      return res.status(400).json({ success: false, message: 'Deadline must be in the future.' });
    }

    const debate = await Debate.create({
      title: title.trim(),
      description: description.trim(),
      statement: statement.trim(),
      category,
      createdBy: req.user._id,
      deadline: debateDeadline,
      status: 'active'
    });

    // Reward creator with +20 points
    await Student.findByIdAndUpdate(req.user._id, { $inc: { totalPoints: 20 } });

    res.status(201).json({
      success: true,
      message: 'Debate created successfully! You earned +20 points.',
      debate
    });
  } catch (error) {
    next(error);
  }
};

export const joinDebate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { side } = req.body;

    if (!['support', 'oppose'].includes(side)) {
      return res.status(400).json({ success: false, message: 'Side must be either "support" or "oppose".' });
    }

    const debate = await Debate.findById(id);
    if (!debate) {
      return res.status(404).json({ success: false, message: 'Debate not found.' });
    }

    if (debate.status === 'completed' || new Date(debate.deadline) <= new Date()) {
      return res.status(400).json({ success: false, message: 'This debate is closed. No new participants can join.' });
    }

    const existingIndex = debate.participants.findIndex(p => p.studentId.toString() === req.user._id.toString());
    if (existingIndex !== -1) {
      // User is updating their side
      debate.participants[existingIndex].side = side;
      await debate.save();
      return res.status(200).json({ success: true, message: `Your stance updated to ${side}.`, side });
    }

    debate.participants.push({ studentId: req.user._id, side });
    await debate.save();

    // Reward participant with +5 points for joining
    await Student.findByIdAndUpdate(req.user._id, { $inc: { totalPoints: 5 } });

    res.status(200).json({
      success: true,
      message: `You successfully joined the debate on the ${side.toUpperCase()} side! (+5 points)`,
      side
    });
  } catch (error) {
    next(error);
  }
};

export const submitArgument = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content, sourceLinks } = req.body;

    if (!content || content.trim().length < 10) {
      return res.status(400).json({ success: false, message: 'Argument content must be at least 10 characters.' });
    }

    const debate = await Debate.findById(id);
    if (!debate) {
      return res.status(404).json({ success: false, message: 'Debate not found.' });
    }

    // Backend-enforced deadline check!
    if (debate.status === 'completed' || new Date(debate.deadline) <= new Date()) {
      debate.status = 'completed';
      await debate.save();
      return res.status(400).json({
        success: false,
        message: 'The debate round deadline has expired. Argument submissions are now closed.'
      });
    }

    // Determine participant side
    const participant = debate.participants.find(p => p.studentId.toString() === req.user._id.toString());
    if (!participant) {
      return res.status(400).json({
        success: false,
        message: 'You must join the debate (choosing Support or Oppose) before submitting arguments.'
      });
    }

    const argument = await Argument.create({
      debateId: debate._id,
      studentId: req.user._id,
      side: participant.side,
      content: content.trim(),
      sourceLinks: Array.isArray(sourceLinks) ? sourceLinks : (sourceLinks ? [sourceLinks] : []),
      votesCount: 0
    });

    // Reward participant with +10 points for a constructive argument
    await Student.findByIdAndUpdate(req.user._id, { $inc: { totalPoints: 10 } });

    const populated = await Argument.findById(argument._id).populate('studentId', 'name college');

    res.status(201).json({
      success: true,
      message: 'Argument submitted successfully! (+10 points earned)',
      argument: populated
    });
  } catch (error) {
    next(error);
  }
};

export const voteArgument = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { argumentId } = req.body;

    if (!argumentId) {
      return res.status(400).json({ success: false, message: 'Please provide the argumentId to vote for.' });
    }

    const debate = await Debate.findById(id);
    if (!debate) {
      return res.status(404).json({ success: false, message: 'Debate not found.' });
    }

    // Check deadline
    if (debate.status === 'completed' || new Date(debate.deadline) <= new Date()) {
      return res.status(400).json({ success: false, message: 'Voting has closed for this debate.' });
    }

    // Enforce one vote per student per debate
    const existingVote = await Vote.findOne({ debateId: debate._id, voterId: req.user._id });
    if (existingVote) {
      return res.status(400).json({
        success: false,
        message: 'You have already cast your vote in this debate. Multiple votes are prohibited.'
      });
    }

    const argument = await Argument.findById(argumentId);
    if (!argument || argument.debateId.toString() !== debate._id.toString()) {
      return res.status(404).json({ success: false, message: 'Argument not found in this debate.' });
    }

    // Prevent voting for own argument
    if (argument.studentId.toString() === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: 'You cannot vote for your own argument.' });
    }

    // Record vote
    await Vote.create({
      debateId: debate._id,
      argumentId: argument._id,
      voterId: req.user._id
    });

    argument.votesCount += 1;
    await argument.save();

    // Reward author of argument +5 points
    await Student.findByIdAndUpdate(argument.studentId, { $inc: { totalPoints: 5 } });

    res.status(200).json({
      success: true,
      message: 'Vote cast successfully!',
      votesCount: argument.votesCount
    });
  } catch (error) {
    next(error);
  }
};

export const getDebateResults = async (req, res, next) => {
  try {
    const { id } = req.params;
    const debate = await Debate.findById(id);
    if (!debate) {
      return res.status(404).json({ success: false, message: 'Debate not found.' });
    }

    const result = await calculateAndStoreResult(debate._id);
    res.status(200).json({ success: true, result });
  } catch (error) {
    next(error);
  }
};