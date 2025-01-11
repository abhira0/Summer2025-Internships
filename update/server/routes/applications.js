// server/routes/applications.js
import express from 'express';
import { ApplicationLog } from '../models/ApplicationLog.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get user's application logs
router.get('/', auth, async (req, res) => {
  try {
    const logs = await ApplicationLog.find({ user: req.user.userId });
    const formattedLogs = {
      applications: {
        [req.user.username]: {
          applied: logs.filter(log => log.status === 'applied' && log.active).map(log => log.jobId),
          hidden: logs.filter(log => log.status === 'hidden' && log.active).map(log => log.jobId)
        }
      }
    };
    res.json(formattedLogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update application status
router.post('/', auth, async (req, res) => {
  try {
    const { jobId, status, value } = req.body;
    
    if (value) {
      await ApplicationLog.findOneAndUpdate(
        { user: req.user.userId, jobId, status },
        { active: true },
        { upsert: true, new: true }
      );
    } else {
      await ApplicationLog.findOneAndUpdate(
        { user: req.user.userId, jobId, status },
        { active: false }
      );
    }
    
    const logs = await ApplicationLog.find({ user: req.user.userId });
    const formattedLogs = {
      applications: {
        [req.user.username]: {
          applied: logs.filter(log => log.status === 'applied' && log.active).map(log => log.jobId),
          hidden: logs.filter(log => log.status === 'hidden' && log.active).map(log => log.jobId)
        }
      }
    };
    res.json(formattedLogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;