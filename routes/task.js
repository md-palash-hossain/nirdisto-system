// task.js

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Get all tasks for a project
router.get('/:projectId/tasks', taskController.getAllTasksForProject);

// Create a new task for a project
router.post('/:projectId/tasks', taskController.createTaskForProject);

// Get a task by ID
router.get('/:projectId/tasks/:taskId', taskController.getTaskById);

module.exports = router;

