const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    minlength: [5, 'Title must be at least 5 characters'],
    maxlength: [120, 'Title cannot exceed 120 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [50, 'Description must be at least 50 characters']
  },
  category: {
    type: String,
    required: true,
    enum: ['Technology', 'Health', 'Education', 'Environment', 'Art', 'Social Impact', 'Finance', 'Other']
  },
  fundingGoal: {
    type: Number,
    required: [true, 'Funding goal is required'],
    min: [100, 'Funding goal must be at least $100']
  },
  currentFunding: {
    type: Number,
    default: 0
  },
  teamSize: {
    type: Number,
    required: [true, 'Team size is required'],
    min: 1
  },
  timeline: {
    type: String,
    required: [true, 'Timeline is required']
  },
  coverImage: {
    type: String,
    default: ''
  },
  innovator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  aiEvaluation: {
    feasibilityScore: { type: Number, default: null },
    successProbability: { type: Number, default: null },
    explanation: { type: String, default: '' },
    evaluatedAt: { type: Date, default: null }
  },
  adminNote: {
    type: String,
    default: ''
  },
  backers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  deadline: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days default
  }
}, { timestamps: true });

// Virtual: funding percentage
projectSchema.virtual('fundingPercentage').get(function () {
  if (this.fundingGoal === 0) return 0;
  return Math.min(Math.round((this.currentFunding / this.fundingGoal) * 100), 100);
});

projectSchema.set('toJSON', { virtuals: true });
projectSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Project', projectSchema);
