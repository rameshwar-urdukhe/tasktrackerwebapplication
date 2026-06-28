const asyncHandler = require("express-async-handler");
const Task = require("../models/Task");

const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
});


const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  res.status(200).json({
    success: true,
    data: task,
  });
});


const createTask = asyncHandler(async (req, res) => {
  const { title, description, priority, category, dueDate } = req.body;

  const task = await Task.create({
    title,
    description,
    priority,
    category,
    dueDate,
  });

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: task,
  });
});


const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: updatedTask,
  });
});


const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
});

const toggleTaskStatus = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  if (task.status === "Completed") {
    task.status = "Pending";
    task.completedAt = null;
  } else {
    task.status = "Completed";
    task.completedAt = new Date();
  }

  await task.save();

  res.json({
    success: true,
    data: task,
  });
});

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
};
