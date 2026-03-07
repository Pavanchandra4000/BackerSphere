const express = require('express');
const Contribution = require('../models/Contribution');
const Project = require('../models/Project');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Contribute to a project (backer only)
router.post('/', protect, authorize('backer'), async (req, res) => {
  try {
    const { projectId, amount, message } = req.body;

    if (!projectId || !amount) {
      return res.status(400).json({ message: 'Project ID and amount are required.' });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: 'Contribution amount must be greater than 0.' });
    }

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found.' });
    if (project.status !== 'approved') {
      return res.status(400).json({ message: 'You can only contribute to approved projects.' });
    }

    const contribution = await Contribution.create({
      backer: req.user._id,
      project: projectId,
      amount,
      message: message || ''
    });

    // Update project funding
    await Project.findByIdAndUpdate(projectId, {
      $inc: { currentFunding: amount },
      $addToSet: { backers: req.user._id }
    });

    // Update user total contributed
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { totalContributed: amount }
    });

    await contribution.populate('project', 'title');
    res.status(201).json({ message: 'Contribution successful!', contribution });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get backer's contributions
router.get('/my', protect, authorize('backer'), async (req, res) => {
  try {
    const contributions = await Contribution.find({ backer: req.user._id })
      .populate('project', 'title category currentFunding fundingGoal status coverImage')
      .sort({ createdAt: -1 });

    res.json(contributions);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get contributions for a specific project (innovator or admin)
router.get('/project/:id', protect, async (req, res) => {
  try {
    const contributions = await Contribution.find({ project: req.params.id })
      .populate('backer', 'name')
      .sort({ createdAt: -1 });

    res.json(contributions);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
