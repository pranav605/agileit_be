const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Task = require("../models/Task");

// Create a new task
router.post("/create", async (req, res) => {
  try{
    const {title, description, status, priority, dueDate, createdBy, assignedToId, project, sprint, tags} = req.body;
    const assignedTo = await User.findById(assignedTo);
    console.log("Assigned To:", assignedTo.toJSON());

    const newTask = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
      createdBy,
      assignedTo,
      project,
      sprint,
      tags
    });

    await newTask.save();
    console.log("New Task saved:", newTask)
    res.status(201).json(newTask);
  } catch (err){
    console.error(err);
    res.status(500).json({error : "Server error, couldn't create the task"});
  }
});

// Get all tasks for a project
router.get("/project/:projectId", async (req, res) => {
  try{
    const tasks = await Task.find({project: req.params.projectId}).populate("assignedTo","name");
    // console.log("TASKS:",tasks)
    if (!tasks) {
      return res.status(404).json({ error: "Tasks not found for this project" });
    }

    res.json(tasks);
  } catch (error){
    console.error(error);
    res.status(500).json({error: "Server error, couldn't fetch tasks"})
  }
});

// Get a single task by ID
router.get("/:taskId", (req, res) => {
  res.send(`Get task ${req.params.taskId}`);
});

module.exports = router;
