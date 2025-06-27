const Project = require('../models/Project');

// Get all projects with populated tasks
exports.getAllProjects = async () => {
  return await Project.find().populate('tasks');
};

// Get a single project by ID with populated tasks
exports.getProjectById = async (id) => {
  return await Project.findById(id).populate('tasks');
};

// Create a new project (ensure fields match schema)
exports.createProject = async (data) => {
  const {
    name,            // ✅ match schema (not title)
    description,
    status = 'Not Started',
    priority = 'Medium',
    startDate,
    deadline,
    tags = []
  } = data;

  const project = new Project({
    name,
    description,
    status,
    priority,
    startDate,
    deadline,
    tags
  });

  return await project.save();
};
