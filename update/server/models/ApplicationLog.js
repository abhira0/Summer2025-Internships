
// server/models/ApplicationLog.js
import mongoose from 'mongoose';


const applicationLogSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    jobId: {
      type: String,
      required: true
    },
    applied: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: true
    }
  }, {
    timestamps: true
  });
  
  const ApplicationLog = mongoose.model('ApplicationLog', applicationLogSchema);
  
  export { ApplicationLog };