
// server/tests/testConnection.js
import connectDB from '../config/db.js';
import { User } from '../models/User.js';

const testConnection = async () => {
  try {
    await connectDB();
    
    // Create test user
    const testUser = new User({
      username: 'demo',
      password: 'demo',
      role: 'user'
    });
    
    await testUser.save();
    console.log('Test user created successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Connection test failed:', error);
    process.exit(1);
  }
};

testConnection();