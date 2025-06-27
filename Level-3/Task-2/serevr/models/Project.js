const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: {
    type: String,
    default: 'Not Started',
  },
  priority: {
    type: String,
    default: 'Medium',
  },
  startDate: Date,
  deadline: Date,
  tags: [String],
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
});

module.exports = mongoose.model('Project', ProjectSchema);
