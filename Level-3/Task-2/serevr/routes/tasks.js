const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Project = require('../models/Project');

router.post('/', async (req, res) => {
  try {
    console.log("📥 Incoming Task Data:", req.body);

    const { title, project, description, assignedTo, dueDate, status } = req.body;

    // Validate required fields
    if (!title || !project) {
      return res.status(400).json({ error: 'Title and project are required' });
    }

    // Create new task
    const task = new Task({
      title,
      description,
      assignedTo,
      dueDate,
      status,
      project // ✅ This is now correct
    });

    const savedTask = await task.save();

    // Link the task to its project
    await Project.findByIdAndUpdate(project, {
      $push: { tasks: savedTask._id }
    });

    res.status(201).json(savedTask);
  } catch (err) {
    console.error('❌ Error creating task:', err);
    res.status(500).json({ error: 'Server error while creating task' });
  }
});

module.exports = router;
