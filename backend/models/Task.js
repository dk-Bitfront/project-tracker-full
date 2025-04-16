const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  name: String,
  status: { type: String, enum: ['Pending', 'Done'], default: 'Pending' },
  dueDate: Date,
});
module.exports = mongoose.model('Task', TaskSchema);