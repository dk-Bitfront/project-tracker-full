const router = require('express').Router();
const auth = require('../middleware/auth');
const Project = require('../models/Project');
const Task = require('../models/Task');

// CREATE project
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, deadline } = req.body;

    const newProject = new Project({
      name,
      description,
      deadline,
      user: req.user.id,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    console.error('❌ Project creation error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET all projects (removed .populate unless needed)
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id }); // removed .populate('tasks')
    res.json(projects);
  } catch (err) {
    console.error('❌ Error fetching projects:', err);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
});

// UPDATE project
router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

//  DELETE project
router.delete('/:id', auth, async (req, res) => {
  try {
    await Project.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    await Task.deleteMany({ projectId: req.params.id });
    res.json({ message: 'Project and related tasks deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

//  ADD task to project
router.post('/:projectId/tasks', auth, async (req, res) => {
  try {
    const task = new Task({ ...req.body, projectId: req.params.projectId });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add task' });
  }
});

//  GET tasks for a project
router.get('/:projectId/tasks', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

//  UPDATE task
router.put('/:projectId/tasks/:taskId', auth, async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

//  DELETE task
router.delete('/:projectId/tasks/:taskId', auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.taskId);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

//  UPDATE task status directly
router.put('/task/:id', auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task status' });
  }
});

module.exports = router;
