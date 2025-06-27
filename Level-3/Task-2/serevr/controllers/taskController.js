const Task = require('../models/Task');
const Project = require('../models/Project');

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('project');
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tasks', error: err.message });
  }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('project');
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving task', error: err.message });
  }
};

// Create a new task and associate it with a project
exports.createTask = async (req, res) => {
  try {
    const { title, description = '', status = 'To Do', deadline, projectId } = req.body;

    if (!title || !projectId) {
      return res.status(400).json({ message: 'Title and projectId are required' });
    }

    // Create and save the new task
    const newTask = new Task({ title, description, status, dueDate: deadline, project: projectId });
    const savedTask = await newTask.save();

    // Push the new task into the project's task list
    await Project.findByIdAndUpdate(projectId, {
      $push: { tasks: savedTask._id }
    });

    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create task', error: err.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update task', error: err.message });
  }
};

// Delete a task and unlink it from the project
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Remove the task reference from the associated project
    await Project.findByIdAndUpdate(task.project, {
      $pull: { tasks: task._id }
    });

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete task', error: err.message });
  }
};
