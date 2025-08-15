const express = require("express");
const router = express.Router();

// Create a new task
router.post("/", (req, res) => {
  res.send("Create a task");
});

// Get all tasks for a project
router.get("/project/:projectId", (req, res) => {
  res.send(`Tasks for project ${req.params.projectId}`);
});

// Get a single task by ID
router.get("/:taskId", (req, res) => {
  res.send(`Get task ${req.params.taskId}`);
});

module.exports = router;
