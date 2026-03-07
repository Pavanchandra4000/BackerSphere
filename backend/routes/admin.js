const express = require('express');
const Project = require('../models/Project');
const User = require('../models/User');
const Contribution = require('../models/Contribution');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All admin routes require admin role
router.use(protect, authorize('admin'));

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const [totalProjects, pendingProjects, approvedProjects, rejectedProjects, totalUsers, totalContributions] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ status: 'pending' }),
      Project.countDocuments({ status: 'approved' }),
      Project.countDocuments({ status: 'rejected' }),
      User.countDocuments({ role: { $ne: 'admin' } }),
      Contribution.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }])
    ]);

    res.json({
      totalProjects,
      pendingProjects,
      approvedProjects,
      rejectedProjects,
      totalUsers,
      totalFunding: totalContributions[0]?.total || 0
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all projects with filters
router.get('/projects', async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    if (status && status !== 'all') query.status = status;

    const projects = await Project.find(query)
      .populate('innovator', 'name email')
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Approve project
router.patch('/projects/:id/approve', async (req, res) => {
  try {
    const { adminNote } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { status: 'approved', adminNote: adminNote || 'Project approved.' },
      { new: true }
    ).populate('innovator', 'name email');

    if (!project) return res.status(404).json({ message: 'Project not found.' });
    res.json({ message: 'Project approved successfully.', project });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Reject project
router.patch('/projects/:id/reject', async (req, res) => {
  try {
    const { adminNote } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected', adminNote: adminNote || 'Project rejected.' },
      { new: true }
    ).populate('innovator', 'name email');

    if (!project) return res.status(404).json({ message: 'Project not found.' });
    res.json({ message: 'Project rejected.', project });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: 'admin' } }).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete any project (admin only)
router.delete('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found.' });

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully by admin.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
