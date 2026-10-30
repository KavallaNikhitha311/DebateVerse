import bcrypt from 'bcryptjs';
import { Student } from '../models/Student.js';
import { Debate } from '../models/Debate.js';
import { Argument } from '../models/Argument.js';
import { Vote } from '../models/Vote.js';
import { Result } from '../models/Result.js';
import { Book } from '../models/Book.js';

export const seedInitialData = async (force = false) => {
  try {
    const debateCount = await Debate.countDocuments();
    if (debateCount > 0 && !force) {
      console.log('[Seeder] Database already populated.');
      return;
    }

    console.log('[Seeder] Seeding relatable, student-friendly debates for DebateVerse...');

    // Clear existing collections
    await Promise.all([
      Student.deleteMany({}),
      Debate.deleteMany({}),
      Argument.deleteMany({}),
      Vote.deleteMany({}),
      Result.deleteMany({}),
      Book.deleteMany({})
    ]);

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);

    // 1. Seed Students
    const students = await Student.insertMany([
      {
        name: 'Aarav Sharma',
        email: 'aarav@debateverse.edu',
        passwordHash,
        college: 'Delhi University',
        interests: ['Education', 'Technology', 'Reading'],
        role: 'student',
        totalPoints: 145
      },
      {
        name: 'Diya Patel',
        email: 'diya@debateverse.edu',
        passwordHash,
        college: 'BITS Pilani',
        interests: ['Social Life', 'Student Rights', 'Science'],
        role: 'student',
        totalPoints: 120
      },
      {
        name: 'Rohan Verma',
        email: 'rohan@debateverse.edu',
        passwordHash,
        college: 'VIT University',
        interests: ['Gaming', 'Artificial Intelligence', 'Sports'],
        role: 'student',
        totalPoints: 95
      },
      {
        name: 'Ananya Roy',
        email: 'ananya@debateverse.edu',
        passwordHash,
        college: 'Mumbai College',
        interests: ['Literature', 'Psychology', 'Nature'],
        role: 'student',
        totalPoints: 110
      },
      {
        name: 'Admin Moderator',
        email: 'admin@debateverse.edu',
        passwordHash,
        college: 'DebateVerse Academic Board',
        interests: ['Student Debates', 'Communication'],
        role: 'admin',
        totalPoints: 200
      }
    ]);

    const [aarav, diya, rohan, ananya, admin] = students;
    const now = Date.now();

    // 2. Seed Simple, Relatable Debates
    const d1 = await Debate.create({
      title: 'Should homework be banned in primary and middle schools?',
      statement: 'Schools should eliminate daily homework assignments to give students more family time, sleep, and hobby time.',
      description: 'Many students and parents argue that heavy homework causes stress without improving real learning, while teachers argue that daily practice reinforces classroom lessons.',
      category: 'Education & Schools',
      createdBy: aarav._id,
      status: 'active',
      startTime: new Date(now - 10 * 60 * 1000),
      deadline: new Date(now + 25 * 60 * 1000), // 25 min left
      participants: [
        { studentId: aarav._id, side: 'support' },
        { studentId: diya._id, side: 'oppose' },
        { studentId: rohan._id, side: 'support' }
      ]
    });

    const d2 = await Debate.create({
      title: 'Is social media doing more harm than good to teenagers?',
      statement: 'Social media apps contribute to anxiety, low self-esteem, and sleep loss among teenagers more than they help stay connected.',
      description: 'With apps like Instagram and TikTok used by millions of teens every day, this debate asks whether the psychological impact outweighs the fun and connection.',
      category: 'Technology & AI',
      createdBy: diya._id,
      status: 'active',
      startTime: new Date(now - 8 * 60 * 1000),
      deadline: new Date(now + 35 * 60 * 1000), // 35 min left
      participants: [
        { studentId: diya._id, side: 'support' },
        { studentId: ananya._id, side: 'oppose' }
      ]
    });

    const d3 = await Debate.create({
      title: 'Should college education be completely free for all students?',
      statement: 'Governments should cover all tuition fees so that any qualified student can attend university without student loan debt.',
      description: 'Examining whether higher education should be a universal public right like high school, or if free tuition leads to high taxes and overcrowded classes.',
      category: 'Society & Life',
      createdBy: rohan._id,
      status: 'completed',
      startTime: new Date(now - 24 * 60 * 60 * 1000),
      deadline: new Date(now - 2 * 60 * 60 * 1000), // Concluded
      participants: [
        { studentId: rohan._id, side: 'support' },
        { studentId: aarav._id, side: 'oppose' },
        { studentId: ananya._id, side: 'support' }
      ]
    });

    const d4 = await Debate.create({
      title: 'Are online classes better than traditional in-person learning?',
      statement: 'Virtual learning provides superior flexibility, self-paced study, and time savings compared to physical classrooms.',
      description: 'Debating whether studying from home is more convenient and productive, or if in-person social interactions and lab hands-on sessions are irreplaceable.',
      category: 'Education & Schools',
      createdBy: ananya._id,
      status: 'active',
      startTime: new Date(now - 5 * 60 * 1000),
      deadline: new Date(now + 15 * 60 * 1000), // 15 min left
      participants: [
        { studentId: ananya._id, side: 'support' },
        { studentId: diya._id, side: 'oppose' }
      ]
    });

    const d5 = await Debate.create({
      title: 'Should AI tools like ChatGPT be allowed for student homework and projects?',
      statement: 'Schools should embrace AI assistants for research, drafting, and problem-solving rather than banning them.',
      description: 'Is using AI a form of cheating that makes students lazy, or is it a powerful modern calculator that prepares students for the future workplace?',
      category: 'Technology & AI',
      createdBy: admin._id,
      status: 'active',
      startTime: new Date(now - 12 * 60 * 1000),
      deadline: new Date(now + 45 * 60 * 1000), // 45 min left
      participants: [
        { studentId: aarav._id, side: 'support' },
        { studentId: rohan._id, side: 'oppose' }
      ]
    });

    const d6 = await Debate.create({
      title: 'Is playing video games beneficial for mental skills or a waste of time?',
      statement: 'Strategic and cooperative video games develop fast decision-making, spatial reasoning, and teamwork skills.',
      description: 'Comparing the cognitive benefits of gaming against the risks of screen addiction, lack of physical exercise, and distracted study habits.',
      category: 'Culture & Gaming',
      createdBy: rohan._id,
      status: 'active',
      startTime: new Date(now - 3 * 60 * 1000),
      deadline: new Date(now + 55 * 60 * 1000),
      participants: [
        { studentId: rohan._id, side: 'support' },
        { studentId: diya._id, side: 'oppose' }
      ]
    });

    // 3. Seed Clear Arguments
    // Debate 1: Homework Ban
    const arg1_1 = await Argument.create({
      debateId: d1._id,
      studentId: aarav._id,
      side: 'support',
      content: 'Students spend 7 to 8 hours in school every day. When they are assigned an additional 2 to 3 hours of homework every night, they do not have enough time for exercise, hobbies, family dinner, or proper sleep. Research shows that well-rested students learn faster in class.',
      sourceLinks: ['https://www.edutopia.org/article/whats-right-amount-homework'],
      votesCount: 6
    });

    const arg1_2 = await Argument.create({
      debateId: d1._id,
      studentId: diya._id,
      side: 'oppose',
      content: 'Homework is necessary because classroom time is only enough to introduce concepts, not master them. Especially in subjects like mathematics, languages, and physics, practicing problems independently at home builds retention and self-discipline.',
      sourceLinks: ['https://www.apa.org/education-career/k12/homework'],
      votesCount: 4
    });

    // Debate 2: Social Media
    const arg2_1 = await Argument.create({
      debateId: d2._id,
      studentId: diya._id,
      side: 'support',
      content: 'Social media algorithms are designed to keep teenagers scrolling endlessly. Comparing one\'s everyday life to curated highlight reels leads to unrealistic body standards, fear of missing out (FOMO), and severe cyberbullying outside school walls.',
      sourceLinks: ['https://www.psychologytoday.com/basics/social-media'],
      votesCount: 5
    });

    const arg2_2 = await Argument.create({
      debateId: d2._id,
      studentId: ananya._id,
      side: 'oppose',
      content: 'Social media allows shy or isolated teenagers to find supportive communities with shared interests like art, coding, literature, or sports. Blaming the tool ignores the fact that teenagers have always navigated social challenges.',
      sourceLinks: [],
      votesCount: 3
    });

    // Debate 3: Free College (Completed)
    const arg3_1 = await Argument.create({
      debateId: d3._id,
      studentId: rohan._id,
      side: 'support',
      content: 'Higher education is an investment in a nation\'s future. When talented students cannot afford university, the entire economy misses out on doctors, engineers, and teachers. An educated workforce pays higher taxes and drives innovation.',
      sourceLinks: [],
      votesCount: 7
    });

    const arg3_2 = await Argument.create({
      debateId: d3._id,
      studentId: aarav._id,
      side: 'oppose',
      content: 'If college is completely free for everyone, the cost has to be paid by working-class taxpayers who never attended college. A better solution is targeted scholarships and need-based financial aid for underprivileged students.',
      sourceLinks: [],
      votesCount: 4
    });

    // 4. Seed Votes
    await Vote.create([
      { debateId: d1._id, argumentId: arg1_1._id, voterId: ananya._id },
      { debateId: d2._id, argumentId: arg2_1._id, voterId: aarav._id },
      { debateId: d3._id, argumentId: arg3_1._id, voterId: diya._id },
      { debateId: d3._id, argumentId: arg3_1._id, voterId: admin._id }
    ]);

    // 5. Result for completed debate 3
    await Result.create({
      debateId: d3._id,
      supportVotes: 7,
      opposeVotes: 4,
      winner: 'support',
      completedAt: new Date(now - 2 * 60 * 60 * 1000)
    });

    // 6. Seed Books
    await Book.create([
      {
        title: 'Thank You for Arguing: The Art of Persuasion',
        author: 'Jay Heinrichs',
        category: 'Debate Strategy',
        description: 'An entertaining and practical guide showing how classical debate tactics from Aristotle can help you win everyday discussions and speak persuasively.',
        publicationYear: 2017,
        coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'
      },
      {
        title: 'Good Arguments: How Debate Teaches Us to Listen',
        author: 'Bo Seo',
        category: 'Communication',
        description: 'Written by a world champion debater, this inspiring book explains how good debates bring people closer together and heal polarizing misunderstandings.',
        publicationYear: 2022,
        coverImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80'
      },
      {
        title: 'The Art of Public Speaking',
        author: 'Dale Carnegie',
        category: 'Public Speaking',
        description: 'Timeless principles for developing self-confidence, organizing thoughts, and captivating audiences during school presentations and formal debates.',
        publicationYear: 2015,
        coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80'
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Daniel Kahneman',
        category: 'Critical Thinking',
        description: 'Explores the two systems that drive human thinking: fast intuitive reactions and slow deliberate logic. Essential for recognizing cognitive biases.',
        publicationYear: 2011,
        coverImage: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=600&q=80'
      }
    ]);

    console.log('[Seeder] Successfully seeded student-friendly debates and books!');
  } catch (error) {
    console.error('[Seeder] Error seeding data:', error.message);
  }
};
