const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Create a new project
router.post('/', async (req, res) => {
  try {
    const {
      name,
      description,
      status = 'Not Started',
      priority = 'Medium',
      startDate,
      deadline,
      tags = [],
    } = req.body;

    const newProject = new Project({
      name,
      description,
      status,
      priority,
      startDate,
      deadline,
      tags,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    console.error('❌ Error creating project:', err);
    res.status(400).json({ error: err.message });
  }
});

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().populate('tasks');
    res.status(200).json(projects);
  } catch (err) {
    console.error('❌ Error fetching projects:', err);
    res.status(500).json({ error: 'Server error while fetching projects' });
  }
});

// Get a single project by ID with populated tasks
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('tasks');
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (err) {
    console.error('❌ Error fetching project by ID:', err);
    res.status(500).json({ error: 'Server error while fetching project' });
  }
});

// DELETE a project by ID (with debug logging)
router.delete('/:id', async (req, res) => {
  console.log('🛠️ Received DELETE request for project ID:', req.params.id);
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      console.log('⚠️ Project not found with ID:', req.params.id);
      return res.status(404).json({ error: 'Project not found' });
    }
    console.log('✅ Project deleted:', deletedProject._id);
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting project:', err);
    res.status(500).json({ error: 'Server error while deleting project' });
  }
});

module.exports = router;
