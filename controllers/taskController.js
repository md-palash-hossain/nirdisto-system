const Task = require('../models/task');

exports.createTask = async (req, res) => {
  try {
    const { projectId, name, description } = req.body;

    const newTask = new Task({
      projectId,
      name,
      description,
      status: 'Pending',
    });

    await newTask.save();

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task: newTask,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const tasks = await Task.find({ projectId }).sort({ createdAt: 'desc' });

    res.status(200).json({ success: true, tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    task.status = status;
    await task.save();

    res.status(200).json({
      success: true,
      message: 'Task status updated successfully',
      task,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
