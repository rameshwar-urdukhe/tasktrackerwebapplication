const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
} = require("../controllers/task.controller");

// GET all tasks & CREATE task
router.route("/").get(getAllTasks).post(createTask);

// GET, UPDATE & DELETE task by ID
router.route("/:id").get(getTaskById).put(updateTask).delete(deleteTask);

router.patch("/:id/status", toggleTaskStatus);

module.exports = router;
