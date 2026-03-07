const mongoose = require('mongoose');

const contributionSchema = new mongoose.Schema({
  backer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Contribution amount is required'],
    min: [1, 'Minimum contribution is $1']
  },
  message: {
    type: String,
    default: '',
    maxlength: [500, 'Message cannot exceed 500 characters']
  },
  status: {
    type: String,
    enum: ['completed', 'refunded'],
    default: 'completed'
  },
  transactionId: {
    type: String,
    default: () => 'TXN-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase()
  }
}, { timestamps: true });

module.exports = mongoose.model('Contribution', contributionSchema);
