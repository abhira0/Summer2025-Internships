// server/scripts/initDB.js
import connectDB from '../config/db.js';
import { User } from '../models/User.js';

const initDB = async () => {
  try {
    await connectDB();

    // Create test user
    await User.create({
      username: 'demo',
      password: 'demo',
      role: 'user'
    });

    console.log('Test user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
};

initDB();