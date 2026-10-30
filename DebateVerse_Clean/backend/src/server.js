import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectDB } from './config/db.js';
import { seedInitialData } from './config/seedData.js';

process.on('uncaughtException', (err) => {
  console.error('[Process Uncaught Exception]:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('[Process Unhandled Rejection]:', reason);
});
process.on('exit', (code) => {
  console.log('[Process Exiting with code]:', code);
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const { isMemory } = await connectDB();
    
    // Automatically seed rich demo data if running in-memory or empty database
    await seedInitialData(isMemory);

    app.listen(PORT, () => {
      console.log(`====================================================`);
      console.log(`  DebateVerse Backend Server running on Port ${PORT}`);
      console.log(`  Health Check: http://localhost:${PORT}/api/health`);
      console.log(`  Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`====================================================`);
    });
  } catch (error) {
    console.error('Fatal Server Error:', error.message);
    process.exit(1);
  }
};

startServer();