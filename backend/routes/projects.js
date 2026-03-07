const express = require('express');
const Project = require('../models/Project');
const { protect, authorize } = require('../middleware/auth');
const { evaluateProject } = require('../config/gemini');

const router = express.Router();

// Get all approved projects (public)
router.get('/', async (req, res) => {
  try {
    const { category, search, sort } = req.query;
    let query = { status: 'approved' };

    if (category && category !== 'All') query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'funding') sortOption = { currentFunding: -1 };
    if (sort === 'goal') sortOption = { fundingGoal: -1 };

    const projects = await Project.find(query)
      .populate('innovator', 'name avatar')
      .sort(sortOption);

    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('innovator', 'name avatar bio');

    if (!project) return res.status(404).json({ message: 'Project not found.' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get innovator's own projects
router.get('/my/projects', protect, authorize('innovator'), async (req, res) => {
  try {
    const projects = await Project.find({ innovator: req.user._id }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Submit new project (innovator only)
router.post('/', protect, authorize('innovator'), async (req, res) => {
  try {
    const { title, description, category, fundingGoal, teamSize, timeline, coverImage, deadline } = req.body;

    if (!title || !description || !category || !fundingGoal || !teamSize || !timeline) {
      return res.status(400).json({ message: 'All required fields must be provided.' });
    }

    const project = await Project.create({
      title, description, category, fundingGoal, teamSize, timeline,
      coverImage: coverImage || '',
      deadline: deadline || undefined,
      innovator: req.user._id,
      status: 'pending'
    });

    // Trigger AI evaluation asynchronously
    evaluateProject({ title, description, category, fundingGoal, teamSize, timeline })
      .then(async (evaluation) => {
        await Project.findByIdAndUpdate(project._id, {
          aiEvaluation: {
            ...evaluation,
            evaluatedAt: new Date()
          }
        });
        console.log(`✅ AI evaluation complete for project: ${project._id}`);
      })
      .catch(err => console.error('AI eval background error:', err.message));

    res.status(201).json({ message: 'Project submitted successfully! AI evaluation in progress.', project });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete own project (innovator only)
router.delete('/:id', protect, authorize('innovator'), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ message: 'Project not found.' });

    // Make sure the innovator owns this project
    if (project.innovator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only delete your own projects.' });
    }

    // Only allow delete if project is pending or rejected (not approved with backers)
    if (project.status === 'approved' && project.currentFunding > 0) {
      return res.status(400).json({ message: 'Cannot delete an approved project that has received funding.' });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
