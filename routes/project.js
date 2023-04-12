// project.js

const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Get all projects
router.get('/', projectController.getAllProjects);

// Create a new project
router.post('/', projectController.createProject);

// Get a project by ID
router.get('/:projectId', projectController.getProjectById);

module.exports = router;

