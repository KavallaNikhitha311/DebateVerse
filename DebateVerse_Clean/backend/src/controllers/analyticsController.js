import mongoose from 'mongoose';
import { Student } from '../models/Student.js';
import { Debate } from '../models/Debate.js';
import { Argument } from '../models/Argument.js';

export const getLeaderboard = async (req, res, next) => {
  try {
    const topStudents = await Student.aggregate([
      { $sort: { totalPoints: -1 } },
      { $limit: 15 },
      { $project: { name: 1, email: 1, college: 1, totalPoints: 1, role: 1 } }
    ]);

    const argumentStats = await Argument.aggregate([
      {
        $group: {
          _id: '$studentId',
          argumentsCount: { $sum: 1 },
          votesReceived: { $sum: '$votesCount' }
        }
      }
    ]);

    const argMap = {};
    argumentStats.forEach(a => {
      argMap[a._id.toString()] = {
        argumentsCount: a.argumentsCount,
        votesReceived: a.votesReceived
      };
    });

    const leaderboard = topStudents.map((student, index) => {
      const stats = argMap[student._id.toString()] || { argumentsCount: 0, votesReceived: 0 };
      return {
        rank: index + 1,
        id: student._id,
        name: student.name,
        college: student.college,
        totalPoints: student.totalPoints,
        argumentsCount: stats.argumentsCount,
        votesReceived: stats.votesReceived
      };
    });

    res.status(200).json({ success: true, count: leaderboard.length, leaderboard });
  } catch (error) {
    next(error);
  }
};

export const getDashboardAnalytics = async (req, res, next) => {
  try {
    const categoryCounts = await Debate.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const statusCounts = await Debate.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const debatesPerStudent = await Debate.aggregate([
      { $group: { _id: '$createdBy', totalCreated: { $sum: 1 } } },
      { $lookup: { from: 'students', localField: '_id', foreignField: '_id', as: 'student' } },
      { $unwind: '$student' },
      { $project: { studentName: '$student.name', college: '$student.college', totalCreated: 1 } },
      { $sort: { totalCreated: -1 } },
      { $limit: 5 }
    ]);

    const voteTotalsBySide = await Argument.aggregate([
      {
        $group: {
          _id: '$side',
          totalVotes: { $sum: '$votesCount' },
          totalArguments: { $sum: 1 }
        }
      }
    ]);

    const totalStudents = await Student.countDocuments();
    const totalDebates = await Debate.countDocuments();
    const totalArguments = await Argument.countDocuments();

    res.status(200).json({
      success: true,
      overview: {
        totalStudents,
        totalDebates,
        totalArguments
      },
      categoryCounts,
      statusCounts,
      debatesPerStudent,
      voteTotalsBySide
    });
  } catch (error) {
    next(error);
  }
};
