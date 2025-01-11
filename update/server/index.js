// server/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import applicationRoutes from './routes/applications.js';
import errorHandler from './middleware/errorHandler.js'; // Import errorHandler

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5174;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);

// Error Handling
app.use(errorHandler); // Use errorHandler

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});